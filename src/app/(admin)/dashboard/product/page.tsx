"use client"; // Convert to client component

import { useGetAllProductsQuery } from "@/lib/api/productApi";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { ModalProvider } from "@/components/product/ProductContext";
import { CrudModals } from "@/components/product/Modal";

export default function DemoPage() {
  const { data, isLoading, isError } = useGetAllProductsQuery();

  return (
    <ModalProvider>
      <div className="container mx-auto py-10 px-10">
        <DataTable columns={columns} data={data || []}/>
        <CrudModals />
      </div>
    </ModalProvider>
  );
}
