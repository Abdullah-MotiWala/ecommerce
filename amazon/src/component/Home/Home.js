import React, { useState, useContext, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ProductCard from "../Product/ProductCard";
import context from "../../context/context";
import { Spin } from "antd";

export default function Home() {
  const productContext = useContext(context);
  const { products, fetProducts, loading } = productContext;
  useEffect(() => {
    fetProducts();
  }, []);

  return (
    <div className="products">
      {loading ? (
        <Spin size="large" style={{ margin: 20 }} />
      ) : (
        <div>
          <Navbar />
          <div className="products">
            {products.map((pro) => {
              return <ProductCard key={pro._id} product={pro} />;
            })}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
