import { Fragment } from "react";

import childrenType from "@/types/children";
import Header from "@/components/sections/header/Header";

const PublicLayout = ({ children }: childrenType) => {
  return (
    <Fragment>
      <Header />
      <main className="container">{children}</main>
    </Fragment>
  );
};

export default PublicLayout;
