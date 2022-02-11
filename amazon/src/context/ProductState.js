import React, { useState } from "react";
import ProductContext from "./context";
import axios from "axios";

export default function ProductState(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetProducts = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/products/fetchproducts");
    setProducts(data.products);
    setLoading(false);
  };

  return (
    <ProductContext.Provider
      value={{ products, fetProducts, loading, setLoading }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
