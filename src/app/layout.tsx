import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@mui/material";
import theme from "../MUI";

import ChildrenType from "@/types/children";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "Generated by create next app",
  icons: {
    icon: "../assets/images/logo.png",
  },
};

export default function RootLayout({ children }: ChildrenType) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}