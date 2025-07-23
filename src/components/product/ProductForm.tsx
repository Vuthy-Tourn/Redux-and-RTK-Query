// components/product-form.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { ImagePreview } from "./ImagePreview";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"), // Changed from 'name' to 'title'
  price: z.number().min(0, "Price must be positive"),
  description: z.string().optional(),
  categoryId: z.number().min(1, "Category ID is required"),
  images: z
    .array(z.string().url())
    .min(1, "At least one image URL is required"),
});

export type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  isLoading?: boolean;
}

export function ProductForm({
  defaultValues,
  onSubmit,
  isLoading,
}: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0 ,
      description: "",
      categoryId: 36,
      images: [],
      ...defaultValues,
    },
  });

   const [newImageUrl, setNewImageUrl] = useState("");

   useEffect(() => {
     if (defaultValues) {
       form.reset({
         title: defaultValues.title || "",
         price: defaultValues.price || 0,
         description: defaultValues.description || "",
         categoryId: defaultValues.categoryId || 36,
         images: defaultValues.images || ["https://placehold.co/600x400"],
       });
     }
   }, [defaultValues, form]);

   const handleAddImage = () => {
     if (
       newImageUrl.trim() &&
       z.string().url().safeParse(newImageUrl).success
     ) {
       const currentImages = form.getValues("images") || [];
       form.setValue("images", [...currentImages, newImageUrl]);
       setNewImageUrl("");
     }
   };

   const handleRemoveImage = (index: number) => {
     const currentImages = form.getValues("images") || [];
     const updatedImages = currentImages.filter((_, i) => i !== index);
     form.setValue("images", updatedImages);
   };

  

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  value={field.value}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

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

         {/* Images Field */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {/* Image URL input */}
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddImage}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Image previews */}
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {field.value?.map((url, index) => (
                      <div key={index} className="relative group">
                        <ImagePreview src={url} alt={`Product preview ${index}`} />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </form>
    </FormProvider>
  );
}
