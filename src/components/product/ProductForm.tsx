import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormProvider } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  useGetAllCategoriesQuery,
  useUploadFileMutation,
} from "@/lib/api/productApi";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(0, "Price must be positive"),
  description: z.string().optional(),
  categoryId: z.number().min(1, "Category is required"),
  images: z
    .array(z.string().url())
    .min(1, "At least one image is required")
    .or(z.array(z.any()).transform((val) => val.filter(Boolean))),
});

export type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => Promise<void>; // Make it async
  isLoading?: boolean;
  isUploading?: boolean;
  setIsUploading?: (value: boolean) => void;
}

export function ProductForm({
  defaultValues,
  onSubmit,
  isLoading,
}: ProductFormProps) {
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery();
  const [uploadFile] = useUploadFileMutation();
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: undefined,
      images: [],
      ...defaultValues,
    },
  });

  // Get selected category for display
  const selectedCategoryId = form.watch("categoryId");
  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  // Remove image handler
  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(files[index].preview);
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

const handleSubmit = async (values: ProductFormValues) => {
  try {
    setIsUploading(true);

    // 1. Validate we have images
    if (files.length === 0 && (!values.images || values.images.length === 0)) {
      form.setError("images", {
        type: "manual",
        message: "At least one image is required",
      });
      return;
    }

    // 2. Upload new files
    const uploadedUrls = await Promise.all(
      files.map(async ({ file }) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await uploadFile(formData).unwrap();
          console.log("Upload response:", response); // Debug log

          // Handle both response formats
          const imageUrl = response.location;

          if (!imageUrl) {
            console.error("Invalid upload response:", response);
            throw new Error("Server did not return a valid image URL");
          }

          return imageUrl;
        } catch (error) {
          console.error("Upload failed:", error);
          throw new Error("Image upload failed. Please try again.");
        }
      })
    );

    // 3. Combine URLs
    const allImageUrls = [...(values.images || []), ...uploadedUrls].filter(
      (url) => url?.startsWith("http")
    );

    // 4. Validate final URLs
    if (allImageUrls.length === 0) {
      throw new Error("No valid image URLs were obtained");
    }

    // 5. Submit product data
    await onSubmit({
      ...values,
      images: allImageUrls,
    });

    // Cleanup
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
  } catch (error) {
    // toast.error(error.message || "Failed to create product");
    console.error("Submission error:", error);
  } finally {
    setIsUploading(false);
  }
};

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price Field */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={field.value}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(isNaN(value) ? 0 : value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Field */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
                disabled={isCategoriesLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isCategoriesLoading ? "Loading..." : "Select a category"
                      }
                    >
                      {selectedCategory?.name || ""}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Product Images</FormLabel>

          {/* Show image count */}
          <div className="text-sm text-muted-foreground">
            {form.watch("images")?.length || 0} existing image(s)
            {files.length > 0 && ` + ${files.length} new upload(s)`}
          </div>

          {/* File input */}
          <div className="flex flex-col gap-2">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center px-4 py-2 border border-dashed rounded-md cursor-pointer hover:bg-accent/50"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Images
            </label>
          </div>

          {/* Image previews */}
          <div className="grid grid-cols-3 gap-2">
            {/* Existing images */}
            {form.watch("images")?.map((url, index) => (
              <div key={`existing-${index}`} className="relative group">
                <Image
                  src={url}
                  alt={`Product image ${index}`}
                  className="w-full h-24 object-cover rounded-md"
                  crossOrigin="anonymous"
                  unoptimized
                  width={96}
                  height={96}
                />
              </div>
            ))}

            {/* New upload previews */}
            {files.map((file, index) => (
              <div key={`new-${index}`} className="relative group">
                <Image
                  src={file.preview}
                  alt={`Preview ${index}`}
                  className="w-full h-24 object-cover rounded-md border-2 border-blue-300"
                  width={96}
                  height={96}
                  unoptimized
                  crossOrigin="anonymous"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          {/* Error message */}
          {form.formState.errors.images && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.images.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isLoading || isUploading}
          className="w-full mt-4"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading Images...
            </>
          ) : isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Product...
            </>
          ) : (
            "Create Product"
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
