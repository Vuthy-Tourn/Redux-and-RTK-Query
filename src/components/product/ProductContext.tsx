// components/modal-context.tsx
"use client";
import { ProductType } from "@/types/ProductType";
import { createContext, useContext, useState } from "react";

type ModalContextType = {
  selectedItem: ProductType | null;
  setSelectedItem: (item: ProductType | null) => void;
  isCreateOpen: boolean;
  setIsCreateOpen: (open: boolean) => void;
  isUpdateOpen: boolean;
  setIsUpdateOpen: (open: boolean) => void;
  isDeleteOpen: boolean;
  setIsDeleteOpen: (open: boolean) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
 const [selectedItem, setSelectedItem] = useState<ProductType | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
        isCreateOpen,
        setIsCreateOpen,
        isUpdateOpen,
        setIsUpdateOpen,
        isDeleteOpen,
        setIsDeleteOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}
