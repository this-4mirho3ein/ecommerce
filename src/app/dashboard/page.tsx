"use client";
import Container from "@/components/Container";
import axios from "axios";
import { useState } from "react";
import {
  Package2,
  Tag,
  ImageIcon,
  FileText,
  PlusCircle,
  Loader2,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const DashboardPage = () => {
  const [newProduct, setnNwProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeProduct = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setnNwProduct({ ...newProduct, [name]: value });
  };

  const handleCreateProduct = () => {
    // Basic validation
    if (
      !newProduct.title ||
      !newProduct.price ||
      !newProduct.image ||
      !newProduct.description
    ) {
      toast.error("لطفا تمام فیلدها را پر کنید");
      return;
    }

    setIsLoading(true);
    axios({
      method: "POST",
      url: "http://localhost:3004/products",
      data: {
        id: Math.floor(Math.random() * 1000000),
        title: newProduct.title,
        price: newProduct.price,
        image: newProduct.image,
        description: newProduct.description,
      },
    })
      .then(() => {
        toast.success("محصول با موفقیت ثبت شد");
        setIsLoading(false);
        setnNwProduct({
          title: "",
          price: "",
          image: "",
          description: "",
        });
      })
      .catch((err) => {
        toast.error("خطا در ثبت محصول");
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10"
      dir="rtl"
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            fontFamily: "inherit",
            direction: "rtl",
          },
          success: {
            duration: 3000,
            style: {
              background: "#22c55e",
              color: "#fff",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#ef4444",
              color: "#fff",
            },
          },
        }}
      />
      <Container>
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              افزودن محصول جدید
            </h1>
            <p className="text-gray-500">اطلاعات محصول جدید را وارد کنید</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عنوان محصول
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Package2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="عنوان محصول"
                    name="title"
                    value={newProduct.title}
                    onChange={handleChangeProduct}
                    className="w-full pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    aria-label="عنوان محصول"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  قیمت محصول
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Tag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="قیمت محصول (تومان)"
                    name="price"
                    value={newProduct.price}
                    onChange={handleChangeProduct}
                    className="w-full pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    aria-label="قیمت محصول"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  آدرس تصویر
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="آدرس URL تصویر"
                    name="image"
                    value={newProduct.image}
                    onChange={handleChangeProduct}
                    className="w-full pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    aria-label="آدرس تصویر"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                توضیحات محصول
              </label>
              <div className="relative">
                <div className="absolute top-3 right-3 pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  placeholder="توضیحات کامل محصول را وارد کنید..."
                  name="description"
                  value={newProduct.description}
                  onChange={handleChangeProduct}
                  rows={5}
                  className="w-full pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  aria-label="توضیحات محصول"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleCreateProduct}
                disabled={isLoading}
                aria-label="ثبت محصول"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>در حال ثبت...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-5 w-5" />
                    <span>ثبت محصول</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
