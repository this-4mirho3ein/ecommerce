"use client";

import React from "react";
import { IAddtoCart } from "../ProductActions";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  increaseQty,
  decreaseQty,
  removeItem,
} from "@/redux/features/cartSlice";

const QuantityControl = ({ id }: IAddtoCart) => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(
    (state) =>
      state.cart.items.find((item) => item.id === parseInt(id as string))
        ?.qty || 0
  );

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center">
        {quantity > 0 && (
          <button
            onClick={() => dispatch(removeItem(parseInt(id as string)))}
            className="text-sm mr-3 text-white bg-red-600 px-4 py-2 rounded-md hover:underline transition-colors flex items-center gap-1"
            aria-label="حذف از سبد خرید"
          >
            <FiTrash2 className="h-4 w-4" />
            حذف
          </button>
        )}
        <button
          onClick={() => dispatch(decreaseQty(parseInt(id as string)))}
          disabled={quantity <= 0}
          className={`w-10 h-10 flex items-center justify-center ${
            quantity > 0
              ? "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          } rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 hover:shadow-sm`}
          aria-label="کاهش تعداد"
        >
          <FiMinus className="h-5 w-5" />
        </button>

        <div className="w-10 h-10 mx-2 flex items-center justify-center text-lg font-bold bg-gray-50 border border-gray-200 rounded-lg">
          {quantity}
        </div>
        <button
          onClick={() => dispatch(increaseQty(parseInt(id as string)))}
          className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 hover:shadow-md"
          aria-label="افزایش تعداد"
        >
          <FiPlus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default QuantityControl;
