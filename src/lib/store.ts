// STEP 1: REDUX STORE SETUP
// Think of Redux store as the "brain" of our app that holds all data

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productsApi } from "./api/productApi";
import cartReducer from "./features/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // persist only the cart slice
};

const rootReducer = combineReducers({
  cart: cartReducer, // Stores shopping cart items
//   auth: authReducer, // Stores user login info
  [productsApi.reducerPath]: productsApi.reducer, // Handles product data from API
//   [authApi.reducerPath]: authApi.reducer, // Handles login/register API calls
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // saving state 

// This is like creating a big storage box for our entire app
export const store = configureStore({
  reducer: persistedReducer, // Use our persisted reducer
  // Middleware helps our APIs work properly (like helpers)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      productsApi.middleware, // Helper for product API
    //   authApi.middleware // Helper for auth API
    ),
});
export const persistor = persistStore(store);
// These types help TypeScript understand our store structure
export type RootState = ReturnType<typeof store.getState>; // What our store looks like
export type AppDispatch = typeof store.dispatch; // How we send actions to store
