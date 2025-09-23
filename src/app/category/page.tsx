// src/app/category/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import SingleProduct  from '@/app/singleProduct/singleProduct';
import { Category, Subcategory, ProductType } from '@/types/products.type';

// Category Type
// export interface Category {
//   _id: string;
//   name: string;
//   image?: string;
//   slug?: string;
//   createdAt?: string;
// }

// Subcategory Type
// export interface Subcategory {
//   _id: string;
//   name: string;
//   category: string; // category id
//   slug?: string;
//   createdAt?: string;
// }

// Product Type
export type Product = ProductType;

const CategoriesWithSteps = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, subsRes, prodsRes] = await Promise.all([
          fetch("https://ecommerce.routemisr.com/api/v1/categories").then(res => res.json()),
          fetch("https://ecommerce.routemisr.com/api/v1/subcategories").then(res => res.json()),
          fetch("https://ecommerce.routemisr.com/api/v1/products").then(res => res.json()),
        ]);

        setCategories(catsRes.data || []);
        setSubcategories(subsRes.data || []);
        setProducts(prodsRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (catId: string) => {
    setSelectedCategoryId(catId);
    setSelectedSubcategoryId(null);
  };

  const handleSubcategoryClick = (subId: string) => {
    setSelectedSubcategoryId(subId);
  };

  // Filter products based on selected subcategory by checking if the product's subcategory array includes the selected subcategory ID and the product's category ID matches the selected category ID
  const filteredSubcategories = subcategories.filter((sub) => sub.category === selectedCategoryId);
  const filteredProducts = products.filter(p =>
    p.subcategory.some(s => s._id === selectedSubcategoryId)
  );


  if (loading) return <p className="text-center text-xl font-medium mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Step 1: Categories */}
      <h2 className="text-2xl font-bold text-purple-800 dark:text-white mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {categories.map((cat: Category) => (
          <button
            key={cat._id}
            className={`border p-4 rounded text-center font-medium hover:bg-blue-50 dark:hover:bg-slate-500 transition ${
              selectedCategoryId === cat._id ? "bg-blue-100 border-blue-500 dark:bg-slate-500 " : ""
            }`}
            onClick={() => handleCategoryClick(cat._id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Step 2: Subcategories */}
      {selectedCategoryId && (
        <>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">Subcategories</h3>
          {filteredSubcategories.length === 0 ? (
            <p className="text-gray-100">No subcategories found.</p>
          ) : (
          <div className="flex flex-wrap gap-3 mb-8">
            {filteredSubcategories.map((sub: Subcategory) => (
              <button
                key={sub._id}
                className={`border px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-500 transition ${
                  selectedSubcategoryId === sub._id ? "bg-gray-200 border-gray-600 dark:bg-slate-500" : ""
                }`}
                onClick={() => handleSubcategoryClick(sub._id)}
              >
                {sub.name}
              </button>
            ))}
          </div> 
          )}
        </>
      )}

      {/* Step 3: Products */}
      {selectedSubcategoryId && (
        <>
          <h3 className="text-xl font-semibold text-purple-700 dark:text-gray-300 mb-3">Products</h3>
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="flex flex-wrap gap-12 w-[90%] mx-auto justify-center rounded-lg">
              {filteredProducts.map((p: Product) => (
                  <SingleProduct product ={p} key={p._id} />
              ))}
            </div>
            
          )}
        </>
      )}
    </div>
  );
};

export default CategoriesWithSteps;
