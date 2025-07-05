import React from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import iphone from "../assets/iphone.png";
import AppleShowcase from "../components/AppleShowcase";
import CategorySlider from "../components/CategorySlider";
import ProductShowcase from "../components/product-showcase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

// API dan serverda ma'lumot olish
async function fetchProducts(limit = 10, skip = 0) {
  // Masalan fakestoreapi dan
  const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}&skip=${skip}`, {
    // serverda fetch uchun 'cache: no-store' qo'yishingiz mumkin,
    // agar har safar yangi ma'lumot kerak bo'lsa
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default async function Home() {
  const limit = 10;
  const skip = 0; // Server componentda hozircha stateni ishlata olmaysiz, shuning uchun paginationni serverda qilmaysiz
  const products = await fetchProducts(limit, skip);

  const renderStars = (rating) => {
    const rate = Math.floor(rating) || 0;
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rate ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white mt-15">
      <section className="relative overflow-hidden bg-[#211C24] text-white">
        {/* BACKGROUND EFFECTS */}
        <motion.div
          className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-500 opacity-20 blur-[120px] rounded-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        />
        <motion.div
          className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-pink-500 opacity-20 blur-[100px] rounded-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2.5 }}
        />

        {/* GRID BACKGROUND LINES */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* CONTENT */}
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="max-w-xl">
            <p className="text-gray-400 font-bold font-inter text-sm mb-2">Pro.Beyond</p>
            <h1 className="text-4xl md:text-6xl font-semibold font-inter leading-tight mb-4">
              <span className="font-inter">Iphone 14 </span>{" "}
              <span className="text-white font-bold">Pro</span>
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              Created to change everything for the better. For everyone.
            </p>
            <Link
              href="/shop"
              className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition"
            >
              Shop Now
            </Link>
          </div>
          <div className="relative mt-10 md:mt-0">
            <motion.div
              className="absolute -top-10 -left-10 w-72 h-72 bg-pink-500 blur-3xl rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1.5 }}
            />
            <img
              src={iphone.src}
              alt="iPhone"
              className="relative w-[280px] md:w-[360px] object-cover z-10"
            />
          </div>
        </div>
      </section>

      <AppleShowcase />
      <CategorySlider />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length === 0 && <p>Mahsulotlar topilmadi.</p>}

            {products.map((product) => (
              <div
                key={product.id}
                className="group dark:border-gray-500 dark:border rounded-[10px] p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
                  {product.images && product.images.length > 0 ? (
                    <Swiper
                      modules={[Pagination]}
                      pagination={{ clickable: true }}
                      spaceBetween={10}
                      className="w-full h-64"
                    >
                      {product.images.map((img, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={img}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-64 object-cover cursor-pointer"
                            // server componentda router.push ishlamaydi
                            // agar kerak bo‘lsa, client componentga o'ting
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      Rasm yo‘q
                    </div>
                  )}
                </div>

                <h4 className="font-semibold mb-2">{product.name || product.title}</h4>
                <div className="flex items-center mb-2">
                  {renderStars(product.rating?.rate || product.rating || 0)}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {product.rating?.rate || product.rating || 0}/5
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg">$ {product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through dark:text-gray-400">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Server componentda state yo‘q, shuning uchun “load more” tugmasi client componentda bo‘lishi kerak */}
        </div>
      </section>

      <ProductShowcase />
    </div>
  );
}
