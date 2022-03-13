import "./App.css";
import Home from "./component/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./component/Product/ProductDetail";
import ErrorB from "./component/ErrorBoundary";
import CartDetails from "./component/Product/CartDetails";
import SignIn from "./component/Auth/SignIn";
import SignUp from "./component/Auth/SignUp";
import Shipping from "./component/Product/Shipping";
import Payment from "./component/Product/Payment";
import PlaceOrder from "./component/Product/PlaceOrder";

function App() {
  return (
    <ErrorB>
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} exact></Route>
            <Route
              path="/productdetail/:id"
              element={<ProductDetail />}
            ></Route>
            <Route path="/cart/:id" element={<CartDetails />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/shipping" element={<Shipping />}></Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route path="/placeorder" element={<PlaceOrder />}></Route>



          </Routes>
        </BrowserRouter>
      </>
    </ErrorB>
  );
}

export default App;
