import "./App.css";
import Home from "./component/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./component/Product/ProductDetail";
import ErrorB from "./component/ErrorBoundary";
import CartDetails from "./component/Product/CartDetails";
import Navbar from "./component/Home/Navbar";
import Footer from "./component/Home/Footer";

function App() {
  return (
    // <ErrorB>
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact></Route>
          <Route path="/productdetail/:id" element={<ProductDetail />}></Route>
          <Route path="/cart/:id" element={<CartDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </>
    // </ErrorB>
  );
}

export default App;
