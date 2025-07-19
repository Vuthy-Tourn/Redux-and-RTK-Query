import { ProductType } from "@/types/ProductType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   images: string[];
//   category: Category;
//   creationAt: string;
//   updatedAt: string;
// }

// export interface Category {
//   id: number;
//   name: string;
//   image: string;
//   creationAt: string;
//   updatedAt: string;
// }

// export interface ProductsQueryParams {
//   categoryId?: number | null;
//   price_min?: number;
//   price_max?: number;
//   limit?: number;
//   offset?: number;
// }

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),

  tagTypes: ["Product", "Category"],
  endpoints: (builder) => ({
    getProductById: builder.query<ProductType, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    getAllProducts: builder.query<{ products: ProductType[] }, void>({
      query: () => "products",
      providesTags: ["Product"],
    }),
  }),
});


export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery
} = productsApi;
