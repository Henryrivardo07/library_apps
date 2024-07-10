import React from "react";
import Navbar from "../navbar";

interface IProps {
  children: React.ReactNode;
}

const Layout = (props: IProps) => {
  return (
    <>
      <div>
        <Navbar />
        {props.children}
      </div>
    </>
  );
};

export default Layout;
