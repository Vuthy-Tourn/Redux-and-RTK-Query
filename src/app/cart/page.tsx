// STEP 9: SHOPPING CART PAGE
// This page shows all items in the user's cart

"use client";

import { useAppSelector } from "@/lib/hook"; // To read cart data from Redux
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CardSummary";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
export default function CartPage() {
  // STEP 9A: Get cart data from Redux store
  const { items } = useAppSelector((state) => state.cart);

  // STEP 9B: Handle empty cart state
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Button asChild>
            <Link href="/product">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  // STEP 9C: Render cart with items
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side: Cart items */}
        <div className="lg:col-span-2">
          <Card className="space-y-4 p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Right side: Order summary */}
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}

// HOW THIS WORKS:
// 1. Component reads cart items from Redux store using useAppSelector
// 2. If cart is empty, shows empty state with link to continue shopping
// 3. If cart has items, shows them in a grid layout:
//    - Left side: List of cart items (each with quantity controls)
//    - Right side: Order summary with totals and checkout button
// 4. Each cart item can be modified (quantity) or removed
// 5. Changes automatically update the Redux store and re-render the page
