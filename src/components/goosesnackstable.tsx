"use client";

import { useEffect, useState } from "react";
import { Product } from "../../types/product"; // Assuming Product is a class that can handle the logic
import ProductRow from "../components/productrow";

interface PriceModifiers {
  profitPercentage: number;
  roundingModifier: number;
}

// Fetches the product list from the API
async function fetchProducts() {
  const response = await fetch("/api/products"); // Assuming you have a products API route
  const data = await response.json();
  return data;
}

async function fetchPriceModifiers(): Promise<{ profitPercentage: number; roundingModifier: number }> {
  try {
      const response = await fetch("/api/priceModifiers"); // API endpoint to fetch priceModifiers
      const priceModifier = await response.json();

      return {
          profitPercentage: priceModifier.profitPercentage ?? 0.25,
          roundingModifier: priceModifier.roundingModifier ?? 0.10,
      };
  } catch (error) {
      console.error("Failed to fetch price modifiers, using defaults:", error);
      return {
          profitPercentage: 0.25,
          roundingModifier: 0.10,
      };
  }
}

export default function GooseSnacksTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceModifiers, setPriceModifiers] = useState<PriceModifiers>({
    profitPercentage: 0.25,
    roundingModifier: 0.10,
  });

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      const priceModifiers = await fetchPriceModifiers();
      setPriceModifiers(priceModifiers);
      setLoading(false);
    }

    loadProducts();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading products...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-600 via-purple-900 to-cyan-600">
      <div className="w-full max-w-4xl overflow-hidden backdrop-blur-sm">
        <div className="p-4 flex justify-center items-center">
          <h1
            className="text-5xl font-bold text-white text-center"
            style={{ textShadow: "4px 4px 0px cyan, 8px 8px 0px magenta" }}
          >
            Goose Snacks
          </h1>
        </div>
        <table className="border border-fuchsia-500">
          <thead>
            <tr className="bg-cyan-600 bg-opacity-50">
              <th className="py-2 px-3 text-left border-r border-b border-fuchsia-500 text-white text-outline whitespace-nowrap">
                Votes
              </th>
              <th className="py-2 px-3 text-left border-r border-b border-fuchsia-500 text-white text-outline whitespace-nowrap">
                Image
              </th>
              <th className="py-2 px-3 text-left border-r border-b border-fuchsia-500 text-white text-outline whitespace-nowrap">
                Product
              </th>
              <th className="py-2 px-3 text-right border-r border-b border-fuchsia-500 text-white text-outline whitespace-nowrap">
                Cost
              </th>
              <th className="py-2 px-3 text-right border-b border-fuchsia-500 text-white text-outline whitespace-nowrap">
                Goose Price
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const _product = Product.fromData(product); // Assuming this is a transformation method for Product
              
              return (
                <ProductRow key={_product.id} product={_product} priceModifiers={priceModifiers} />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}