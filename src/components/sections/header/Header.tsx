import { Button, Badge } from "@mui/material";
import React from "react";

import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import logo from "@/assets/images/logo.png";
import Image from "next/image";
import NavLink from "../../shares/NavLink";

import "./style.scss";

const Header = () => {
  return (
    <header id="header">
      <nav className="container nav">
        <div className="nav__left">
          <NavLink href="/">
            <Image src={logo} alt="logo" width={50} />
          </NavLink>
          <div className="nav__left__menu">
            <Button href="/about">Haqida</Button>
            <Button href="/contact">{`Bog'lanish`}</Button>
          </div>
        </div>
        <div className="nav__right">
          <div className="nav__right__menu">
            <Button startIcon={<CategoryIcon />} href="/products">
              Mahsulotlar
            </Button>
            <Badge badgeContent={5} color="error">
              <Button startIcon={<FavoriteIcon />} href="/favourites">
                Sevimlilar
              </Button>
            </Badge>

            <Badge badgeContent={10} color="success">
              <Button
                variant="outlined"
                startIcon={<ShoppingCartIcon />}
                href="/my-cart"
              >
                Savatcham
              </Button>
            </Badge>
          </div>
          <div className="nav__right__auth">
            <Button variant="contained" href="/login">
              Login
            </Button>
            <Button variant="outlined" href="/register">{`Sign up`}</Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
