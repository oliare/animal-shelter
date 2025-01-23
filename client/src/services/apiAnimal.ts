import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from "../api/index.ts";
import { IAnimalItem, IAnimalCreate, IAnimalEdit, ISelectParams } from "../interfaces/animals/index.ts";

export const api_animal = createApi({
    reducerPath: 'animal',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/` }),
    tagTypes: ["Animal"],
    endpoints: (builder) => ({
        getAnimals: builder.query<IAnimalItem[], void>({
            query: () => 'animals',
            providesTags: ["Animal"],
        }),
        getAnimal: builder.query<IAnimalItem, number>({
            query: (id) => `animals/detail/${id}`,
            providesTags: (_, __, id) => [{ type: 'Animal', id }],
        }),
        getAnimalSelectItems: builder.query<ISelectParams, void>({
            query: () => `animals/select-items`,
            providesTags: ['Animal'],
        }),
        createAnimal: builder.mutation<IAnimalCreate, FormData>({
            query: (newAnimal) => ({
                url: 'animals/create',
                method: 'POST',
                body: newAnimal,
            }),
            invalidatesTags: ["Animal"],
        }),
        updateAnimal: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: `animals/update/${formData.get('id')}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ["Animal"],
        }),

        deleteAnimal: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `animals/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Animal"],
        }),
    }),
});


export const {
    useGetAnimalsQuery,
    useGetAnimalQuery,
    useCreateAnimalMutation,
    useUpdateAnimalMutation,
    useDeleteAnimalMutation,
    useGetAnimalSelectItemsQuery } = api_animal;