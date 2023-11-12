import Image from "next/image";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";

import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import Favourite from "@/components/shares/Favourite";

import "./style.scss";

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
  quantity
}: PropTypes) => {
  return (
    <div id="card">
      <div className="card">
        <div className="card__img">
          
          <Image fill objectFit="cover" src={imageUrl} alt="product-image" />
          <Favourite />
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
            <IconButton size="large" color="primary">
              <AddShoppingCartOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
