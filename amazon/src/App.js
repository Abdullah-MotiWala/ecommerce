import "./App.css";
import Home from "./component/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./component/Product/ProductDetail";
import ProductState from "./context/ProductState";
import ErrorB from "./component/ErrorBoundary";

function App() {
  return (
    <ErrorB>
      {/* <ProductState> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} exact></Route>
            <Route path="/productdetail/:id" element={<ProductDetail />}>
              {/* <Home /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      {/* </ProductState> */}
    </ErrorB>
  );
}

export default App;
