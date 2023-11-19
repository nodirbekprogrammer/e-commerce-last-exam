"use client";

import ProductCard from "@/components/card/product-card/ProductCard";
import useStore from "@/hooks/useStore";
import useFavorite from "@/states/favorite";
import React from "react";

const FavoritesSection = () => {
  const favoriteStore = useStore(useFavorite, (state) => state);
  const data = favoriteStore?.favorites;
  console.log(data);

  return (
    <section id="favorites">
      <h1>Sevimlilar</h1>
      {/* <div className="favorites-wrapper">
        {data?.map((product) => (
          <ProductCard
            key={product?.id}
            title={product?.title ? product?.title : "Lorem ipsum dolor!"}
            description={
              product?.description?.length > 0
                ? product?.description.slice(0, 60)
                : "Lorem ipsum dolor sit amet"
            }
            price={product?.price ? product?.price : 0}
            imageUrl={
              product?.imageUrl
                ? product?.imageUrl
                : "https://media.istockphoto.com/id/1197832105/vector/male-hand-holding-megaphone-with-new-product-speech-bubble-loudspeaker-banner-for-business.jpg?s=612x612&w=0&k=20&c=INIM5M-N2DZh6pS6DUBSGh7x9ItOBSC3atZOVJtQf7M="
            }
            id={product?.id}
            quantity={product?.quantity}
          />
        ))}
      </div> */}
    </section>
  );
};

export default FavoritesSection;
