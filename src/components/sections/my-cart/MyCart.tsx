"use client";

import Image from "next/image";
import { Button } from "@mui/material";

import useStore from "@/hooks/useStore";
import useCart from "@/states/cart";
import CartCard from "@/components/card/cart-card/CartCard";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import freeCart from "@/assets/images/free-cart.svg";

import "./style.scss";

const MyCart = () => {
  const cartStore = useStore(useCart, (state) => state);
  const items = cartStore?.items;

  return (
    <section id="my-cart">
      <h1>My Cart ({items?.length})</h1>
      <div className="cart-body">
        {items?.length !== 0 ? (
          <div className="cart-products">
            {items?.map((item) => (
              <CartCard
                key={item?.product?.id}
                title={item?.product?.title ?? "Lorem ipsum dolor!"}
                description={
                  item?.product?.description?.length > 0
                    ? item?.product?.description.slice(0, 60)
                    : "Lorem ipsum dolor sit amet"
                }
                price={item?.product?.price * item?.quantity ?? 0}
                imageUrl={
                  item?.product?.imageUrl ??
                  "https://media.istockphoto.com/id/1197832105/vector/male-hand-holding-megaphone-with-new-product-speech-bubble-loudspeaker-banner-for-business.jpg?s=612x612&w=0&k=20&c=INIM5M-N2DZh6pS6DUBSGh7x9ItOBSC3atZOVJtQf7M="
                }
                id={item?.product?.id}
                quantity={item?.quantity}
                isIncreaseDisabled={
                  item?.quantity == item?.product?.quantity ? true : false
                }
              />
            ))}
          </div>
        ) : (
          <div className="empty">
            <div className="empty__img">
              <Image
                fill
                objectFit="contain"
                src={freeCart}
                alt="Your cart is empty"
              />
            </div>
            <h3>{`Savatchangiz hali ham bo'sh, shucha vaqt nima qildiz? 🤔`}</h3>
            <Button
              endIcon={<ArrowBackIcon />}
              variant="contained"
              href="/products"
            >Mahsulotlar</Button>
          </div>
        )}

        <div className="cart-actions-wrapper">
          <div className="cart-actions">
            <div className="cart-summary">
              <h2>Buyutmangiz</h2>
              <div className="cart-summary__content">
                <div>
                  <p>Mahsulotlar soni:</p>
                  <p>{items?.length}ta</p>
                </div>
                <div>
                  <p>Jami:</p>
                  <p>
                    {cartStore?.getTotalPrice()}
                    {`so'm`}
                  </p>
                </div>
                <Button
                  disabled={items?.length == 0 ? true : false}
                  href="/checkout"
                  variant="contained"
                >
                  Rasmiylashtirish
                </Button>
              </div>
            </div>
            {items?.length !== 0 ? (
              <Button
                className="clearCart"
                size="large"
                color="error"
                variant="contained"
                onClick={cartStore?.clearCart}
              >
                Savatni tozalash
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCart;
