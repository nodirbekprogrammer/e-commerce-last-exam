import { Fragment } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amazon.uz",
  description: "Amazon Home Page",
};
import LatestProducts from "@/components/sections/public/latestProducts/LatestProducts";
import Categories from "@/components/sections/public/categories/Categories";

const Home = () => {
  return (
    <Fragment>
      <LatestProducts />
      <Categories />
    </Fragment>
  );
};

export default Home;
