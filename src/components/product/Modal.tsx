"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { ProductForm, ProductFormValues } from "./ProductForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useModalContext } from "./ProductContext";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/lib/api/productApi";
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";

export function CrudModals() {
  const {
    selectedItem,
    isCreateOpen,
    setIsCreateOpen,
    isUpdateOpen,
    setIsUpdateOpen,
    isDeleteOpen,
    setIsDeleteOpen,
  } = useModalContext();

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [isLoading, setIsLoading] = useState(false);

const handleCreate = async (values: ProductFormValues) => {
  setIsLoading(true);
  try {
    // The values.images now contains the actual URLs from upload
    await createProduct(values).unwrap();
    toast.success("Product created successfully");
    setIsCreateOpen(false);
  } catch (error) {
    toast.error("Failed to create product");
    console.error("Creation error:", error);
  } finally {
    setIsLoading(false);
  }
};

  const handleUpdate = async (values: ProductFormValues) => {
    if (!selectedItem?.id) return;

    setIsLoading(true);
    try {
      await updateProduct({
        id: selectedItem.id,
        data: values,
      }).unwrap();
      toast.success("Product updated successfully");
      setIsUpdateOpen(false);
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem?.id) return;

    setIsLoading(true);
    try {
      await deleteProduct(selectedItem.id).unwrap();
      toast.success("Product deleted successfully");
      setIsDeleteOpen(false);
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Delete error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Create Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Create New Product
            </DialogTitle>
          </DialogHeader>
          <ProductForm onSubmit={handleCreate} isLoading={isLoading} />
        </DialogContent>
      </Dialog>

      {/* Update Modal */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Update Product
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            defaultValues={selectedItem ?? undefined}
            onSubmit={handleUpdate}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-gray-700">
              Are you sure you want to delete &quot;{selectedItem?.title}&quot;?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsDeleteOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
