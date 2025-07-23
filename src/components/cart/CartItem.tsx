"use client";

import Image from "next/image";
import { useAppDispatch } from "@/lib/hook";
import { updateQuantity, removeFromCart } from "@/lib/features/cartSlice";
import type { CartItem as CartItemType } from "@/lib/features/cartSlice";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Input } from "../ui/input";
import { useEffect } from "react";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  useEffect(() => {
  console.log(item);
  })

  return (
    <TableRow key={item.id}>
      <TableCell>
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          width={60}
          height={60}
          unoptimized
          className="rounded-md"
        />
      </TableCell>

      <TableCell className="font-medium">{item.title}</TableCell>

      <TableCell>
        {/* Quantity Controls */}
        <div className="flex items-center space-x-2">
          {/* Decrease quantity button */}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1} // Can't go below 1
          >
            <Minus className="h-4 w-4" />
          </Button>

          {/* Quantity input field */}
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleQuantityChange(Number.parseInt(e.target.value) || 1)
            }
            className="w-16 text-center"
            min="1"
          />

          {/* Increase quantity button */}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-transparent"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>

      <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>

      <TableCell>
        <Button size="icon" variant="ghost" onClick={handleRemove}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
