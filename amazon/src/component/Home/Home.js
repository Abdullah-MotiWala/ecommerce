import React, { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ProductCard from "../Product/ProductCard";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/porductActions";

export default function Home() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div className="products">
      {loading ? (
        <Spin size="large" style={{ margin: 20 }} />
      ) : error ? (
        <p>Some Error Occured</p>
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
