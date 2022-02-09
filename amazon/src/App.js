import './App.css';
import Home from './component/Home/Home';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ProductDetail from './component/Product/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />} exact></Route>
      <Route path='/productdetail/:id' element={<ProductDetail />} ></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
