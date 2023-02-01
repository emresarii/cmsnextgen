import React from "react";
import { HeaderMegaMenu } from "../components/header";

const Layout = ({ children }: any) => {
  return (
    <>
      <HeaderMegaMenu />
      {children}
    </>
  );
};

export default Layout;
