"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Container from "./Container";
import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.qty, 0);
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    {
      title: "خانه",
      href: "/",
    },
    {
      title: "فروشگاه",
      href: "/store",
    },
    {
      title: "داشبورد",
      href: "/dashboard",
    },    {
      title: "ورود",
      href: "/login",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all shadow duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white/80 py-4"
      }`}
    >
      <Container>
        <div className="pr-4 flex flex-row-reverse items-center justify-between">
          <div className="hidden md:flex md:flex-row-reverse md:justify-between md:gap-8 items-center">
            <Link
              href="/"
              className="font-bold text-xl text-gray-800 border-l-2 border-gray-800 pl-5"
            >
              فروشگاه من
            </Link>

            {/* Desktop Navigation */}
            {navLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`font-medium transition-colors duration-200 hover:text-sky-600 ${
                  pathName === item.href
                    ? "text-sky-600 border-b-2 border-sky-600 pb-1"
                    : "text-gray-700"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-sky-600 transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="p-2 text-gray-700 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md">
          <div className="flex flex-col py-4 px-6 space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`font-medium py-2 ${
                  pathName === item.href ? "text-sky-600" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
