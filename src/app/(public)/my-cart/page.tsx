import React from 'react'
import { Metadata } from "next";
import MyCart from '@/components/sections/public/my-cart/MyCart';


export const metadata: Metadata = {
  title: "Amazon | Savatcham",
  description: "E-commerce website cart side",
};

const MyCartPage = () => {
  return (
    <MyCart/>
  )
}

export default MyCartPage;