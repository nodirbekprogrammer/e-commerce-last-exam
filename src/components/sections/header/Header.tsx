"use client";

import { useEffect, useState, Fragment } from "react";
import {
  Button,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import logo from "@/assets/images/logo.png";
import Image from "next/image";
import NavLink from "../../shares/NavLink";

import "./style.scss";
import useStore from "@/hooks/useStore";
import useCart from "@/states/cart";
import useAuth from "@/states/auth";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isShrinked, setIsShrinked] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    window?.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        setIsShrinked(true);
      } else {
        setIsShrinked(false);
      }
    });
  }, []);

  const cartStore = useStore(useCart, (state) => state);
  const orderQuantity = cartStore?.items?.length;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        AMAZON
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <header className="header" id={isShrinked ? "shrinked" : ""}>
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

            <Badge badgeContent={orderQuantity} color="success">
              <Button
                variant="outlined"
                startIcon={<ShoppingCartIcon />}
                href="/my-cart"
              >
                Savatcham
              </Button>
            </Badge>
            {isAuthenticated && user?.role === 0 ? (
              <Button
                variant="outlined"
                startIcon={<BookmarkBorderIcon />}
                href="/user-orders"
              >
                Buyurtmalar
              </Button>
            ) : null}
          </div>
          <div className="nav__right__auth">
            {isAuthenticated && user?.role === 0 ? (
              <Button
                endIcon={<AccountBoxIcon />}
                variant="contained"
                href="/user-account"
              >
                Hisobim
              </Button>
            ) : (
              <Fragment>
                <Button variant="contained" href="/login">
                  Login
                </Button>
                <Button variant="outlined" href="/register">
                  Sign up
                </Button>
              </Fragment>
            )}
          </div>
        </div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </nav>
      <nav>
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </header>
  );
};

export default Header;
