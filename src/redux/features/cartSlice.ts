import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
  initialized: boolean;
}

// Set empty initial state for SSR
const initialState: CartState = {
  items: [],
  initialized: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCart: (state, action: PayloadAction<CartItem[]>) => {
      // Only initialize once and only if empty (don't overwrite user changes)
      if (!state.initialized) {
        state.items = action.payload;
        state.initialized = true;
      }
    },
    increaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.qty += 1;
      } else {
        state.items.push({ id: action.payload, qty: 1 });
      }
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decreaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.qty === 1) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        } else {
          item.qty -= 1;
        }
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.items));
        }
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
  },
});

export const { initializeCart, increaseQty, decreaseQty, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;

// Helper function to load cart from localStorage
export const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const cartData = localStorage.getItem("cart");

    if (!cartData) {
      return [];
    }

    const parsedData = JSON.parse(cartData);

    // If parsedData is an object with 'items' property (old format)
    if (
      !Array.isArray(parsedData) &&
      parsedData &&
      typeof parsedData === "object" &&
      Array.isArray(parsedData.items)
    ) {
      console.log("Converting old cart format to new format");
      const items = parsedData.items;
      // Update localStorage with correct format
      localStorage.setItem("cart", JSON.stringify(items));
      return items;
    }

    // Validate that parsedData is an array
    if (!Array.isArray(parsedData)) {
      console.error("Cart data is not an array, resetting", parsedData);
      // Clear invalid data
      localStorage.removeItem("cart");
      return [];
    }

    // Filter and validate each item
    return parsedData.filter(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.id === "number" &&
        typeof item.qty === "number"
    );
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    // Clear invalid data
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    return [];
  }
};
