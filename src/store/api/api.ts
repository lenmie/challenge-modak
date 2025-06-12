import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoriesResponse, ProductsResponse } from './types';

const BASE_URL = 'https://dummyjson.com';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, void>({
            query: () => '/products',
        }),
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => '/products/categories',
        }),
    }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = api;

