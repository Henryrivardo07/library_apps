import React from "react";

import Layout from "../../components/main-layout";
import MyCaraousel from "../../components/myCaraousel";
import Category from "@/components/category";
import BookList from "@/components/book-list";

const Home = () => {
  return (
    <Layout>
      <MyCaraousel />
      <Category />
      <BookList />
    </Layout>
  );
};

export default Home;
