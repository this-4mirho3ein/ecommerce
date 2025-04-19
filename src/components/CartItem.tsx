"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ProductItemProps } from "@/types/type";
import QuantityControl from "./ui/QuantityControl";
import Image from "next/image";

interface ICartItemProps {
  id: number;
  qty: number;
}

const CartItem = ({ id, qty }: ICartItemProps) => {
  const [data, setData] = useState({} as ProductItemProps);
  useEffect(() => {
    axios(`http://localhost:3004/products/${id}`).then((result) => {
      const { data } = result;
      setData(data);
    });
  }, [id]);

  return (
    <div
      className="flex items-stretch bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md mb-4 p-5 dir-rtl transition-shadow duration-200"
      dir="rtl"
    >
      {/* Image Section */}
      <div className="flex-shrink-0 w-28 h-28 ml-5">
        <Image
          width={40}
          height={40}
          className="w-full h-full object-cover rounded-lg border border-gray-100"
          src={data.image}
          alt={data.title || "تصویر محصول"}
        />
      </div>

      {/* Details Section */}
      <div className="flex-grow flex flex-col justify-between">
        {/* Top part: Title and Unit Price */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1 leading-tight">
            {data.title}
          </h2>
          <p className="text-sm text-gray-500 mb-5">{data.description}</p>
          <p className="text-sm text-gray-500 mb-2">
            قیمت واحد:{" "}
            <span className="font-medium text-gray-600">
              {/* Use Intl.NumberFormat and cast to Number */}
              {data.price
                ? new Intl.NumberFormat("fa-IR").format(Number(data.price))
                : "-"}{" "}
              تومان
            </span>
          </p>
        </div>

        {/* Bottom part: Controls and Total Price */}
        <div className="flex items-center justify-between mt-auto pt-2">
          {/* Quantity Controls */}
          <section dir="ltr">
            <QuantityControl id={id.toString()} />
          </section>

          {/* Total Price for this item */}
          {data.price && qty > 0 && (
            <div className="text-left mr-auto pl-4">
              {" "}
              {/* Aligns total to the left (start in RTL) */}
              <p className="text-xs text-gray-500">مجموع</p>
              <p className="text-base font-bold text-gray-900">
                {/* Also apply Intl.NumberFormat here */}
                {data.price
                  ? new Intl.NumberFormat("fa-IR").format(
                      Number(data.price) * qty
                    )
                  : "-"}{" "}
                تومان
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
