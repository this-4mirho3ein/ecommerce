"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import CartInitializer from "./CartInitializer";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <CartInitializer />
      {children}
    </Provider>
  );
}
