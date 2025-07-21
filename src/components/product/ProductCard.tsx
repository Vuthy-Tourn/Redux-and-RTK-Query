import { ProductType } from "@/types/ProductType";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAppDispatch } from "@/lib/hook";
import { addToCart } from "@/lib/features/cartSlice";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  thumbnail,
  product
}: ProductType) {
    const dispatch = useAppDispatch();
    //  const { toast } = useToast();
  
    const handleAddToCart = (e: React.MouseEvent) => {
      e.preventDefault();
      dispatch(addToCart(product));
      //  toast({
      //    title: "Added to cart",
      //    description: `${product.title} has been added to your cart.`,
      //  });
    };
  return (
    <div
      key={id}
      className=" rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden group cursor-pointer"
    >
      <Link href={`/product/${id}`}>
        <div className="relative">
          <Image
            src={thumbnail}
            alt={title}
            className="w-full h-60 object-cover group-hover:scale-105 transition-transform"
            unoptimized
            width={500}
            height={300}
          />
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
            NEW
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-1 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-3">
            {description}
          </p>
        </div>
      </Link>
      <div className="flex justify-between items-center mt-2 px-5 pb-5">
        <span className="text-xl font-bold text-green-600">${price}</span>
        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
