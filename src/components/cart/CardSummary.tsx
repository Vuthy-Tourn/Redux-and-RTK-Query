"use client";

import { useAppSelector } from "@/lib/hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartSummary() {
  const { total, itemCount } = useAppSelector((state) => state.cart);

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal ({itemCount} items)</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <Separator />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>

        {total < 50 && (
          <p className="text-sm text-muted-foreground">
            Add ${(50 - total).toFixed(2)} more for free shipping!
          </p>
        )}

        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>✓ Secure checkout</p>
          <p>✓ 30-day return policy</p>
          <p>✓ Customer support</p>
        </div>
      </CardContent>
    </Card>
  );
}
