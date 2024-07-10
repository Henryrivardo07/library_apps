// src/pages/home/Home.tsx
import React, { useEffect, useState } from "react";
import BookList from "../../components/book-list";
import Layout from "../../components/main-layout";
import MyCaraousel from "../../components/myCaraousel"; // Pastikan path impor benar
import Category from "@/components/category";

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
