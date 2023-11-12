import DynamicMetaData from "@/types/metaData";
import React from "react";

export function generateMetadata({ params, searchParams }: DynamicMetaData) {
  const { categoryId } = params;
  return {
    title: categoryId,
    description: categoryId,
  };
}

const CategoryPage = () => {
  return (
    <div>
      <h1>CategoryPage</h1>
    </div>
  );
};

export default CategoryPage;
