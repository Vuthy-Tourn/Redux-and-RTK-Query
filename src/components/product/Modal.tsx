// components/crud-modals.tsx
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

// components/crud-modals.tsx
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
      // Remove any undefined values before submission
      const submissionData = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v !== undefined)
      );

      await createProduct(submissionData).unwrap();
      toast.success("Product created successfully");
      setIsCreateOpen(false);
    } catch (error) {
      toast.error("Failed to create product");
      console.error("Create error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (values: ProductFormValues) => {
    if (!selectedItem?.id) return;

    setIsLoading(true);
    try {
      // Prepare update data - only send changed fields if desired
      const updateData = {
        id: selectedItem.id,
        data: {
          ...values,
        },
      };

      await updateProduct(updateData).unwrap();
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
    setIsLoading(true);
    try {
      await deleteProduct(selectedItem.id).unwrap();
      toast.success("Product deleted successfully");
      setIsDeleteOpen(false);
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Create Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogTitle>Create New Product</DialogTitle>
          </DialogHeader>
          <ProductForm onSubmit={handleCreate} isLoading={isLoading} />
        </DialogContent>
      </Dialog>

      {/* Update Modal */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            defaultValues={selectedItem}
            onSubmit={handleUpdate}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-2">
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
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
