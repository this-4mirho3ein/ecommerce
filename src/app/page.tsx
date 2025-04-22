import Container from "@/components/Container";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const Home = () => {
  return (
    <Container size="full" className="px-0">
      <div className="min-h-[85vh] bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              به <span className="text-blue-600">فروشگاه ما</span> خوش آمدید
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-10">
              محصولات فوق‌العاده با بهترین قیمت‌ها و کیفیت استثنایی را کشف کنید
            </p>

            <Link
              href="/store"
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ShoppingBag className="w-5 h-5 group-hover:animate-bounce ml-1" />
              <span>مشاهده فروشگاه</span>
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "محصولات با کیفیت",
                description:
                  "کالاهای دقیق انتخاب شده که استانداردهای بالای ما را برآورده می‌کنند",
              },
              {
                title: "تحویل سریع",
                description:
                  "با گزینه‌های ارسال ویژه ما، سفارش‌های خود را سریعا دریافت کنید",
              },
              {
                title: "پشتیبانی ۲۴/۷",
                description: "تیم خدمات مشتری ما همیشه آماده کمک به شما است",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-right"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
