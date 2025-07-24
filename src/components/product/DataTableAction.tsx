// components/data-table-actions.tsx
"use client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModalContext } from "./ProductContext";
import { ProductType } from "@/types/ProductType";
import { Row } from "@tanstack/react-table";

export function DataTableActions({ row }: { row: unknown }) {
  const { setSelectedItem, setIsUpdateOpen, setIsDeleteOpen } =
    useModalContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem onClick={() => setIsCreateOpen(true)}>
          Create
        </DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={() => {
            setSelectedItem((row as Row<ProductType>).original);
            setIsUpdateOpen(true);
          }}
        >
          Update
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
              setSelectedItem((row as Row<ProductType>).original);
            setIsDeleteOpen(true);
          }}
          className="text-red-600"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
