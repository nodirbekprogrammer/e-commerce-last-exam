import { Metadata } from "next";
import { Fragment } from "react";

import childrenType from "@/types/children";
import Header from "@/components/sections/header/Header";

export const metadata: Metadata = {
  title: "Amazon | Mahsuoltlar",
  description: "E-commerce website products side",
};

const PublicLayout = ({ children }: childrenType) => {
  return (
    <Fragment>
      <Header />
      <main id="document-main" className="container">
        {children}
      </main>
    </Fragment>
  );
};

export default PublicLayout;
