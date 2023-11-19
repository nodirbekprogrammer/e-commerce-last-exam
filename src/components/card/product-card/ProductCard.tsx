import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import IconButton from "@mui/material/IconButton";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import Favourite from "@/components/shares/Favourite";

import useCart from "@/states/cart";

import "./style.scss";
// import useFavorite from "@/states/favorite";
// import ProductData from "@/types/productData";

type PropTypes = {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  id: string;
  quantity: number;
};

const ProductCard = ({
  title,
  description,
  price,
  imageUrl,
  id,
  quantity,
}: PropTypes) => {
  const addToCart = useCart((state) => state.addToCart);
  // const { favorites, addToFavorites, removeFromFavorites } = useFavorite();

  // const isFavorite = (productId: string) => {
  //   return favorites.some(
  //     (favoriteProduct) => favoriteProduct.id === productId
  //   );
  // };

  // const handleToggleFavorite = () => {
  //   if (isFavorite(id)) {
  //     removeFromFavorites(id);
  //   } else {
  //     addToFavorites({ title, description, price, imageUrl, id, quantity });
  //   }
  // };
  const handleAddToCart = () => {
    addToCart({ title, description, price, imageUrl, id, quantity });
  };

  return (
    <div id="card">
      <div className="card">
        <div className="card__img">
          <Image fill objectFit="cover" src={imageUrl} alt="product-image" />
          <Favourite/>
          <span className="quantity">{quantity} dona</span>
        </div>
        <div className="card__content">
          <h3 className="title">{title}</h3>
          <p className="description">
            {description}...
            <Link
              className="description__more"
              href={id ? `/products/${id}` : "#"}
            >
              more
            </Link>
          </p>
          <hr />
          <div className="card__content__bottom">
            <p className="price">
              {price} {`so'm`}
            </p>
            <IconButton onClick={handleAddToCart} size="large" color="primary">
              <AddShoppingCartOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
