"use client";

import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductItemProps } from "@/types/type";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Percent,
  Tag,
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  Truck,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { RiShoppingCart2Line } from "react-icons/ri";

interface IDiscountData {
  id: number;
  code: string;
  percentage: number;
}

// فرمت کردن اعداد به فارسی
const formatNumber = (num: number): string => {
  return num.toLocaleString("fa-IR");
};

// Custom toast styling
const toastConfig = {
  rtl: true,
  position: "top-right" as const,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Slide,
  className: "font-medium text-sm rtl",
  autoClose: 5000,
};

// Custom toast styles by type
const successToast = (message: string) => {
  toast.success(message, {
    ...toastConfig,
    icon: () => <CheckCircle2 className="h-7 w-7 text-green-500" />,
  });
};

const errorToast = (message: string) => {
  toast.error(message, {
    ...toastConfig,
    icon: () => <XCircle className="h-7 w-7 text-red-500" />,
  });
};

const Cart = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [data, setData] = useState<ProductItemProps[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [isApplyingDiscount, setIsApplyingDiscount] = useState<boolean>(false);

  // گرفتن لیست محصولات از API
  useEffect(() => {
    axios(`http://localhost:3004/products`).then((result) => {
      const { data } = result;
      setData(data);
    });
  }, []);

  // محاسبه قیمت کل
  const totalPrice = cartItems.reduce((total, item) => {
    const selectedProduct = data.find(
      (product) => product.id === item.id.toString()
    );
    return total + (Number(selectedProduct?.price) || 0) * item.qty;
  }, 0);

  // اعمال تخفیف (در صورت وجود)
  useEffect(() => {
    if (discountPercentage > 0) {
      const discountedPrice =
        totalPrice - (totalPrice * discountPercentage) / 100;
      setFinalPrice(discountedPrice);
    } else {
      setFinalPrice(totalPrice);
    }
  }, [totalPrice, discountPercentage]);

  // بررسی و اعمال کد تخفیف
  const handleSubmitDiscount = () => {
    if (!discountCode.trim()) {
      errorToast("لطفاً کد تخفیف را وارد کنید");
      return;
    }

    setIsApplyingDiscount(true);
    axios(`http://localhost:3004/discounts?code=${discountCode}`)
      .then((result) => {
        const data = result.data as IDiscountData[];
        if (data.length > 0) {
          const percentage = data[0].percentage;
          setDiscountPercentage(percentage);
          successToast(
            `کد تخفیف ${discountCode} با موفقیت اعمال شد (${percentage}٪ تخفیف)`
          );
        } else {
          setDiscountPercentage(0);
          errorToast("کد تخفیف وارد شده معتبر نیست");
        }
      })
      .catch(() => {
        errorToast("خطا در بررسی کد تخفیف");
      })
      .finally(() => {
        setIsApplyingDiscount(false);
      });
  };

  const handleGoToStore = () => {
    router.push("/store");
  };

  return (
    <Container>
      <ToastContainer
        rtl={true}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="light"
        transition={Slide}
        className="font-vazir"
        toastClassName={(context) =>
          context?.type === "success"
            ? "bg-white shadow-md rounded-lg overflow-hidden border-l-4 border-green-500 p-1"
            : context?.type === "error"
            ? "bg-white shadow-md rounded-lg overflow-hidden border-l-4 border-red-500 p-1"
            : "bg-white shadow-md rounded-lg overflow-hidden border-l-4 border-indigo-500 p-1"
        }
      />

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/store"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">برگشت به فروشگاه</span>
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          سبد خرید شما
          <ShoppingCart className="h-6 w-6 ml-2 text-indigo-600" />
        </h1>
      </div>

      {/* Cart Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-4">
            <div className="border-b border-gray-100 py-4 px-6 bg-indigo-50">
              <h2 className="text-lg font-bold text-gray-800 text-right flex items-center justify-end">
                خلاصه سفارش
                <Tag className="h-5 w-5 ml-2 text-indigo-600" />
              </h2>
            </div>

            <div className="p-6">
              {/* Price Summary */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-900">
                    {formatNumber(totalPrice)} تومان
                  </span>
                  <span className="text-gray-600">قیمت کل</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span
                    className={`font-medium ${
                      discountPercentage > 0
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {discountPercentage > 0
                      ? formatNumber(totalPrice - finalPrice)
                      : formatNumber(0)}{" "}
                    تومان
                    {discountPercentage > 0 && (
                      <span className="inline-block mr-2 bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded-full">
                        {discountPercentage}٪
                      </span>
                    )}
                  </span>
                  <span className="text-gray-600">سود شما از این خرید</span>
                </div>

                <div className="flex justify-between items-center py-3 bg-gray-50 px-4 rounded-xl">
                  <span className="font-bold text-lg text-gray-900">
                    {formatNumber(finalPrice)} تومان
                  </span>
                  <span className="font-medium text-gray-800">قیمت نهایی</span>
                </div>
              </div>

              {/* Discount Code Input */}
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <label
                  htmlFor="discountCode"
                  className="block text-sm font-medium text-gray-700 mb-2 text-right"
                >
                  کد تخفیف دارید؟
                </label>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={handleSubmitDiscount}
                    disabled={isApplyingDiscount}
                    className={`${
                      isApplyingDiscount
                        ? "bg-gray-400"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center min-w-[80px]`}
                  >
                    {isApplyingDiscount ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Percent className="h-4 w-4 mr-1" />
                        اعمال
                      </>
                    )}
                  </button>
                  <input
                    id="discountCode"
                    type="text"
                    className="flex-grow text-right border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all"
                    placeholder="کد تخفیف را وارد کنید"
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              {cartItems.length > 0 && (
                <div className="space-y-3">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg text-sm transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    تکمیل خرید و پرداخت
                  </button>
                  <button
                    onClick={handleGoToStore}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg text-sm transition-all duration-200"
                  >
                    ادامه خرید در فروشگاه
                  </button>
                </div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-1">
                    <Truck className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-[10px] text-gray-600 text-center">
                    ارسال سریع
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mb-1">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-[10px] text-gray-600 text-center">
                    ضمانت کیفیت
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center mb-1">
                    <CreditCard className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-[10px] text-gray-600 text-center">
                    پرداخت امن
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            {cartItems.length > 0 ? (
              <div>
                <div className="border-b border-gray-100 py-4 px-6 bg-gray-50 flex justify-between text-sm font-medium text-gray-500 rtl">
                  <span>محصولات ({cartItems.length})</span>
                  <span>سبد خرید شما</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} {...item} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center flex flex-col items-center">
                <div className="mb-6 text-gray-300">
                  <RiShoppingCart2Line size={120} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  سبد خرید شما خالی است
                </h3>
                <p className="text-gray-500 mb-6 max-w-md">
                  محصولات مورد نظر خود را به سبد خرید اضافه کنید تا بتوانید خرید
                  خود را تکمیل نمایید.
                </p>
                <button
                  onClick={handleGoToStore}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="font-medium">مشاهده محصولات</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
