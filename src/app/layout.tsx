import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";
import ReduxProvider from "@/components/ReduxProvider";

export const metadata: Metadata = {
  title: "سایت فروشگاه",
  description: "این یک سایت فروشگاهی است که با next.js ساخته شده است .",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <ReduxProvider>
          <Layout>{children}</Layout>
        </ReduxProvider>
      </body>
    </html>
  );
}
