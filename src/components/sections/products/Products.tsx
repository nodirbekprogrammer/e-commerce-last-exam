"use client";

import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";

import SearchIcon from "@mui/icons-material/Search";

import ProductsHook from "@/states/products";
import useCategories from "@/states/categories";
import ProductCard from "@/components/card/product-card/ProductCard";
import Skelet from "@/components/shares/skeleton/Skeleton";

import "./style.scss";

const Products = () => {
  const {
    search,
    category,
    total,
    page,
    loading,
    data: products,
    getData,
    handleCategory,
    handleSearch,
    setPage,
  } = ProductsHook();

  const { data: categories, getCategories } = useCategories();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    getData(search, category, page);
  }, [getData, search, category, page]);

  return (
    <section className="products">
      <div className="products__header">
        <h1>Topilgan mahsulotlar ({total})</h1>
        <div className="products__header__search">
          <label htmlFor="search">
            <SearchIcon />
          </label>
          <input
            value={search}
            onChange={handleSearch}
            id="search"
            type="search"
          />
        </div>
        <select
          className="category-filter"
          value={category}
          onChange={handleCategory}
        >
          <option value="">Hammasi</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="products-wrappper">
        {loading
          ? [...Array(8)].map((_, index) => <Skelet key={index} />)
          : products.map((product) => (
              <ProductCard
                key={product?._id}
                title={product?.title ? product?.title : "Lorem ipsum dolor!"}
                description={
                  product?.description?.length > 0
                    ? product?.description.slice(0, 60)
                    : "Lorem ipsum dolor sit amet"
                }
                price={product?.price ? product?.price : 0}
                imageUrl={
                  product?.image?.url
                    ? product?.image?.url
                    : "https://media.istockphoto.com/id/1197832105/vector/male-hand-holding-megaphone-with-new-product-speech-bubble-loudspeaker-banner-for-business.jpg?s=612x612&w=0&k=20&c=INIM5M-N2DZh6pS6DUBSGh7x9ItOBSC3atZOVJtQf7M="
                }
                id={product?._id}
                quantity={product?.quantity}
              />
            ))}
      </div>
      <div className="pagination">
        {total > 10 ? (
          <Pagination
            page={page}
            onChange={(e, page) => setPage(e, page)}
            count={Math.ceil(total / 10)}
            color="primary"
            boundaryCount={2}
            size="large"
          />
        ) : null}
      </div>
    </section>
  );
};

export default Products;
