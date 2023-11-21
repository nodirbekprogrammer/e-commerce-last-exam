"use client";

import React, { useEffect } from "react";

import CategoryCard from "@/components/card/category-card/CategoryCard";
import "./style.scss";
import useCategories from "@/states/public/categories";
import CategoryCardSkeleton from "@/components/shares/skeleton/CategoryCardSkeleton";

const Categories = () => {
  const { data: categories, getCategories, loading } = useCategories();

  useEffect(() => {
    getCategories();
  }, [getCategories]);
  return (
    <section id="categories">
      <h1>Barcha turkumlar</h1>
      <div className="categories__wrapper">
        {loading
          ? [...Array(17)].map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))
          : categories?.map((category) => (
              <CategoryCard
                key={category?._id}
                name={category?.name}
                imageUrl={category?.image?.url}
                categoryId={category?._id}
              />
            ))}
      </div>
    </section>
  );
};

export default Categories;
