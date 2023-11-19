"use client";

import React, { Fragment, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link";

import useLatestProducts from "@/states/latestProducts";
import ProductCard from "../../card/product-card/ProductCard";
import Skelet from "@/components/shares/skeleton/Skeleton";

import "./style.scss";
import "../../card/product-card/style.scss";

const LatestProducts = () => {
  const {
    data: latestProducts,
    getData: getLatestProducts,
    loading,
  } = useLatestProducts();

  useEffect(() => {
    getLatestProducts();
  }, [getLatestProducts]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="slider">
      <div className="slider__heading">
        <h1>Har bir turkumdagi eng yangi mahsulotlar</h1>
        <Link href="/products">{`Hammasini ko'rish`}</Link>
      </div>

      <Slider {...settings}>
        {loading
          ? [...Array(15)].map((_, index) => <Skelet key={index} />)
          : latestProducts?.map((product) => (
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
      </Slider>
    </div>
  );
};

export default LatestProducts;
