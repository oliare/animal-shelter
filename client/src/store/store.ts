import { configureStore } from '@reduxjs/toolkit';
import { api_animal } from '../services/apiAnimal';

export const store = configureStore({
    reducer: {
        [api_animal.reducerPath]: api_animal.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api_animal.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;