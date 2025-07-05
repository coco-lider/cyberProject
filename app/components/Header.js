"use client"; // agar Next.js 13+ bo‘lsa, agar siz app router ishlatayotgan bo‘lsangiz

import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingCart,
  Heart,
  User,
  X,
  Moon,
  Sun,
  Globe,
  LogOut,
} from "lucide-react";

const Header = ({
  likedCount = 0,
  cartCount = 0,
  isDarkMode = false,
  language = "en",
  onToggleMenu = () => {},
  onToggleProfile = () => {},
  onToggleTheme = () => {},
  onLanguageChange = () => {},
  onLogout = () => {},
}) => {
  return (
    <header className="border-b fixed w-full top-0 z-50 bg-white dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <div className="font-bold text-xl">
          <Link href="/">cyber</Link>
        </div>

        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 w-80">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Qidirish..."
            className="bg-transparent outline-none flex-1 text-sm text-black dark:text-white"
          />
        </div>

        <nav className="hidden lg:flex space-x-8">
          <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
          <Link href="/shop" className="hover:text-gray-600 dark:hover:text-gray-300">About</Link>
          <Link href="/contact" className="hover:text-gray-600 dark:hover:text-gray-300">Contact</Link>
          <Link href="/blog" className="hover:text-gray-600 dark:hover:text-gray-300">Blog</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Mobile search & menu */}
          <div className="lg:hidden p-2">
            <Menu className="h-5 w-5" onClick={onToggleMenu} />
          </div>

          {/* Like, Cart, Profile */}
          <Link href="/likes" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600">
            <div className="relative">
              <Heart className="h-5 w-5" />
              {likedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1">
                  {likedCount}
                </span>
              )}
            </div>
          </Link>

          <Link href="/cart" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600">
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          <button
            onClick={onToggleProfile}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Profile Sidebar Placeholder */}
      {/* Shu erda isOpen props orqali navigatsiya, logout tugmasi, dark-mode toggle, language select */}
    </header>
  );
};

export default Header;
