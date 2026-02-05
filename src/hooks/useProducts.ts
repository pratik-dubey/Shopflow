"use client";

import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";

const API_URL = "https://fakestoreapi.com/products";

export const useProducts = () => {
  const { products, filteredProducts, isLoading, error, setProducts, setLoading, setError } = useShopStore();

  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length > 0) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        
        const data = await response.json();
        const transformedData = data.map((product: any) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: product.rating || { rate: 4.0, count: 100 },
        }));

        setProducts(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [products.length, setProducts, setLoading, setError]);

  return { products, filteredProducts, isLoading, error };
};