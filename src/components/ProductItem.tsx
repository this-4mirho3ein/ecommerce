import Image from "next/image";
import { ProductItemProps } from "@/types/type";
import { Heart, ShoppingCart, Eye, Tag } from "lucide-react";

// Function to format numbers in Persian with comma separators
const formatNumber = (num: number): string => {
  return num.toLocaleString("fa-IR");
};

const ProductItem = ({
  image,
  title,
  description,
  price,
}: ProductItemProps) => {
  // Calculate if the product has a discount (items above 300000 get 15% discount)
  const hasDiscount = Number(price) > 300000;
  const discountPercentage = 15;
  const originalPrice = hasDiscount
    ? Math.round(Number(price) * 1.15)
    : Number(price);
  const finalPrice = Number(price);

  return (
    <div className="group h-full bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col relative">
      {/* Product labels - New, Sale, etc */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 rtl">
        
        {hasDiscount && (
          <span className="px-2.5 py-1 text-[10px] font-bold bg-red-500 text-white rounded-md shadow-sm flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {discountPercentage}٪ تخفیف
          </span>
        )}
      </div>

      {/* Floating action buttons */}
      <div className="absolute left-3 z-10 flex flex-col gap-2 transition-all duration-300 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 top-3">
        <button
          className="w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-200 bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white"
          aria-label="افزودن به علاقه‌مندی‌ها"
          tabIndex={0}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Image container with aspect ratio */}
      <div className="relative overflow-hidden bg-gray-50 pt-[75%]">
        <Image
          src={image || "/placeholder-product.jpg"}
          alt={title || "محصول"}
          className="absolute inset-0 w-full h-full object-cover p-2 transition-all duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
          quality={95}
        />

        {/* Overlay actions that appear on hover */}
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <div className="flex gap-2 transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
            <button
              className="w-10 h-10 rounded-full bg-white/90 text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center shadow-md transition-all duration-200"
              aria-label="مشاهده جزئیات محصول"
              tabIndex={0}
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white/90 text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center shadow-md transition-all duration-200"
              aria-label="افزودن به سبد خرید"
              tabIndex={0}
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-5 text-right grow">
        {/* Category badge */}
        <div className="mb-2">
          <span className="inline-block px-2.5 py-1 text-[10px] bg-indigo-50 text-indigo-600 font-medium rounded-md">
            دسته‌بندی
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 transition-colors line-clamp-1 text-base mb-2 hover:text-indigo-600 cursor-pointer">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Price and rating */}
        <div className="mt-auto">
          {/* Rating */}
          <div className="flex justify-end mb-3">
            <div className="flex items-center gap-1">
              <span className="text-[15px] text-gray-500">( ۴.۸ )</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-3 h-3 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <button
              className="group/btn inline-flex items-center justify-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow"
              tabIndex={0}
            >
              <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">
                مشاهده
              </span>
              <Eye className="h-3.5 w-3.5 transition-transform duration-200 rtl:group-hover/btn:translate-x-0.5" />
            </button>

            <div className="flex flex-col items-end">
              {hasDiscount ? (
                <>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">
                      {discountPercentage}٪
                    </span>
                    <span className="line-through text-[11px] text-gray-400">
                      {formatNumber(originalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-gray-500">تومان</span>
                    <span className="font-bold text-gray-900 text-base">
                      {formatNumber(finalPrice)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-[10px] text-gray-500 mb-0.5">قیمت</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-gray-500">تومان</span>
                    <span className="font-bold text-gray-900 text-base">
                      {formatNumber(finalPrice)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
