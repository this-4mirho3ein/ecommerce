"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  initializeCart,
  loadCartFromLocalStorage,
} from "@/redux/features/cartSlice";

export default function CartInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cart data from localStorage after component mounts (client-side only)
    const cartItems = loadCartFromLocalStorage();
    dispatch(initializeCart(cartItems));
  }, [dispatch]);

  // This is a utility component with no UI
  return null;
}
