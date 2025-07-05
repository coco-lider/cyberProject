import React from "react";

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=10");
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white mt-15 p-8">
      <h1 className="text-3xl font-bold mb-8">Product List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="font-semibold text-lg">{product.title}</h2>
            <p className="text-gray-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
