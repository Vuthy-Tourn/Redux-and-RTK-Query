import { ProductType } from "@/types/ProductType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "http";

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

export interface CategoryType {
  id: number;
  name: string;
  image: string;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_PLATZI_BASE_URL,
  }),

  tagTypes: ["Product", "Category"],
  endpoints: (builder) => ({
    getProductById: builder.query<ProductType, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    getAllProducts: builder.query<ProductType[], void>({
      query: () => "products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product" as const, id: "LIST" },
            ]
          : [{ type: "Product" as const, id: "LIST" }],
    }),
    createProduct: builder.mutation<ProductType, Partial<ProductType>>({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      ProductType,
      { id: number; data: Partial<ProductType> }
    >({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    deleteProduct: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    uploadFile: builder.mutation<{ location: string }, FormData>({
      query: (formData) => ({
        url: "files/upload",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: any) => {
        // Handle both possible response formats
        return {
          location: response.location || response.url,
        };
      },
    }),
    getAllCategories: builder.query<CategoryType[], void>({
      query: () => "categories",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Category" as const, id })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
  }),
});


export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllCategoriesQuery,
  useUploadFileMutation
} = productsApi;
