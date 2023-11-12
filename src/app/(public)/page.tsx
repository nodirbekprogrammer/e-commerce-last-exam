import {Fragment} from "react"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amazon.uz",
  description: "Amazon Home Page",
};
import LatestProducts from "@/components/sections/latestProducts/LatestProducts";
import Categories from "@/components/sections/categories/Categories";

const Home = () => {
  return (
    <Fragment>
      <LatestProducts />
      <Categories />
    </Fragment>
  );
};

export default Home;
