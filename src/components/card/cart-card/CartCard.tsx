import Image from "next/image";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import DeleteIcon from "@mui/icons-material/Delete";

import useCart from "@/states/public/cart";

import "./style.scss";

type PropTypes = {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  id: string;
  quantity: number;
  isIncreaseDisabled: boolean;
};

const CartCard = ({
  title,
  description,
  price,
  imageUrl,
  id,
  quantity,
  isIncreaseDisabled,
}: PropTypes) => {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  return (
    <div className="cart-card">
      <div className="cart-card__img">
        <Image fill objectFit="cover" src={imageUrl} alt="product-image" />
      </div>
      <div className="cart-card__body">
        <div className="cart-card__body__content">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="cart-card__body__actions">
          <Button
            onClick={() => removeFromCart(id)}
            variant="outlined"
            startIcon={<DeleteIcon />}
            color="error"
            className="delete"
          >
            Delete
          </Button>
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
            className="priority-controller"
          >
            <Button onClick={() => decreaseQuantity(id)}>-</Button>
            <Button className="quantity" variant="outlined">
              {quantity}
            </Button>
            <Button
              disabled={isIncreaseDisabled}
              onClick={() => increaseQuantity(id)}
            >
              +
            </Button>
          </ButtonGroup>
          <div className="total-price">
            Umumiy narx: {price} {`so'm`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
