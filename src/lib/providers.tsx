// STEP 5: REDUX PROVIDER
// This makes Redux available to all components in our app

"use client"; // This is a client component (runs in browser)

import type React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

// This component wraps our entire app and provides Redux store to all children
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

// HOW THIS WORKS:
// 1. We wrap our app with this Providers component
// 2. The Provider gives all child components access to the Redux store
// 3. Any component can now use useAppSelector to read data
// 4. Any component can now use useAppDispatch to send actions
