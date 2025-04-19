"use client";

import Button from "./ui/Button";
import QuantityControl from "./ui/QuantityControl";
import {
  FaShoppingCart,
  FaHeart,
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaPinterest,
} from "react-icons/fa";
import Link from "next/link";

export interface IAddtoCart {
  id: string;
}

const ProductActions = ({ id }: IAddtoCart) => {

  return (
    <div className="mt-auto">
      <div className="flex flex-wrap justify-end items-center gap-6 mb-6">
        <div className="flex items-center  gap-3">
          <QuantityControl id={id} />
          <span className="font-medium text-gray-700 text-right rtl">
            تعداد :{" "}
          </span>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <Link href={'http://localhost:3000/cart'}>
        <Button
          size="lg"
          rtl
          
          className="flex-grow items-center justify-center bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          برو به سبد خرید
          <FaShoppingCart className="h-5 w-5 mr-2" />
        </Button>
        </Link>


        <div className="flex gap-2">
          {/* Heart icon */}
          <div className="relative group">
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 hover:border-red-200 hover:bg-red-50 transition-colors duration-300">
              <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gray-800 text-white text-xs py-1 px-2 rounded pointer-events-none transform translate-y-1 group-hover:translate-y-0">
                افزودن به علاقه‌مندی‌ها
              </span>
              <FaHeart className="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors duration-200 transform group-hover:scale-110" />
            </button>
          </div>

          {/* Share icon */}
          <div className="relative group">
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 hover:border-sky-200 hover:bg-sky-50 transition-colors duration-300">
              <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gray-800 text-white text-xs py-1 px-2 rounded pointer-events-none transform translate-y-1 group-hover:translate-y-0">
                اشتراک گذاری
              </span>
              <FaShareAlt className="w-6 h-6 text-gray-500 group-hover:text-sky-500 transition-colors duration-200 transform group-hover:scale-110" />
            </button>

            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 top-full right-0 mt-2 bg-white shadow-xl rounded-xl p-3 flex gap-3 z-10 pointer-events-none group-hover:pointer-events-auto">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="Share on Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-sky-100 text-sky-500 hover:bg-sky-500 hover:text-white transition-colors"
                aria-label="Share on Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                aria-label="Share on Pinterest"
              >
                <FaPinterest className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductActions;
