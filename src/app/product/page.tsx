"use client";
import React from "react";
import ProductCard from "@/components/product/ProductCard";
// import { products } from "../../data/product";
import Link from "next/link";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import Loading from "../loading";
import { ProductType } from "@/types/ProductType";

export default function page() {
  const {
    data = { products: [] },
    isLoading,
    error,
  } = useGetAllProductsQuery();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="min-h-screen py-16 px-6">
      {/* <!-- Hero --> */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Explore Our Premium Gear
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
          Top-rated tech and lifestyle essentials to power your day. Free
          shipping on all orders above $50.
        </p>
        <div className="mt-6">
          <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
            Shop Now
          </button>
          <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 m-1">
            បញ្ជាទិញទំនិញ
          </button>
        </div>
      </div>

      {/* <!-- Category Filters --> */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300">
          All
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300">
          Headphones
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300">
          Shoes
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300">
          Watches
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300">
          Accessories
        </button>
      </div>

      {/* <!-- Product Grid --> */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {data.products.map((product) => (
          <ProductCard
            product={product}
            id={product.id}
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            thumbnail={product.thumbnail}
            rating={product.rating}
            images={product.images}
            warrantyInformation={product.warrantyInformation}
            shippingInformation={product.shippingInformation}
            availabilityStatus={product.availabilityStatus}
          />
        ))}
      </div>
    </section>
  );
}
