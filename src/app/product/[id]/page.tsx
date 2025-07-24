'use client'
import React from "react";
import Image from "next/image";
// import { products } from "@/data/product";
import { useGetProductByIdQuery } from "@/lib/api/productApi";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
// import { Metadata } from "next";

// export async function generateMetadata(
//   // ✅ Let Next.js infer the correct type
//   props: any
// ): Promise<Metadata> {
//   const { params } = props;

//   try {
//     const res = await fetch(
//       `${process.env.BASE_URL}products/${params.id}`
//     );
//     if (!res.ok) {
//       return { title: "Product not found" };
//     }

//     const product = await res.json();

//     return {
//       title: product?.title ?? "Product Detail",
//       description: product?.description ?? "",
//       openGraph: {
//         title: product?.title,
//         description: product?.description,
//         images: [product?.thumbnail],
//       },
//     };
//   } catch {
//     return {
//       title: "Product not found",
//     };
//   }
// }

// async function getProduct(id: string) {
//   const BASE_URL = `${process.env.BASE_URL}products/${id}`;
//   const res = await fetch(BASE_URL);
//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }
//   const data = (await res).json();
//   const products: ProductType = await data;
//   return products;
// }
export default function ProductPage() {
  const  param  = useParams();
  const id = Number.parseInt(param.id as string);
  const { data: product, isLoading } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (product) {
          dispatch(addToCart(product));
        }
      };

   if (isLoading) {
     return <Loading />;
   }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-600">Product Not Found</h1>
        <p className="text-gray-600 mt-2">
          The product you are looking for does not exist.
        </p>
      </div>
    );
  }


  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="p-4 rounded-lg shadow-md">
              <Image
                src={product.images[0]}
                alt={product.title}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg object-contain"
                priority
                unoptimized
              />
            </div>

            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product.images.map((image, index) => (
                <div key={index} className="bg-white p-2 rounded-md shadow-sm">
                  <Image
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    width={100}
                    height={100}
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <div className="p-6 rounded-lg">
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                {product.description}
              </p>
              <p className="text-gray-500 text-sm mb-4">SKU: {product.sku}</p>

              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900 dark:text-white ">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through ml-2">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="ml-2 text-green-600 font-medium">
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100
                    )}
                    % OFF
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`size-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Color:</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`size-8 rounded-full border-2 border-transparent hover:border-gray-300 transition-all`}
                        style={{ backgroundColor: color }}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity:
                </label>
                <div className="flex items-center">
                  <button className="size-8 text-black dark:text-white flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-200 hover:dark:text-black">
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    defaultValue="1"
                    className="w-12 h-8 text-center border-t border-b border-gray-300"
                  />
                  <button className="size-8 text-black dark:text-white flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-200 hover:dark:text-black">
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 flex gap-2 items-center justify-center text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  Add to Cart
                </button>
                <button className="flex-1 bg-gray-100 flex gap-2 items-center justify-center text-gray-800 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  Wishlist
                </button>
              </div>

              {/* Product Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <ul className="list-disc">
                  <li className="text-gray-700 dark:text-gray-400 mb-2">
                    {product.warrantyInformation}
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Brand:</strong> {product.shippingInformation}
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 mb-2">
                    <strong>Category:</strong>{" "}
                    <span className="text-green-500">
                      {product.availabilityStatus}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Key Features */}
              {/* <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div> */}

              {/* Specifications */}
              {product.specifications && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <tr
                              key={key}
                              className="border-b border-gray-200 last:border-0"
                            >
                              <td className="py-2 font-medium text-gray-700 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </td>
                              <td className="py-2 text-gray-600">{value}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
