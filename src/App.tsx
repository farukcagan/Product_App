import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetailPage/ProductDetail";
import ProductList from "./pages/ProductListPage/ProductList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<ProductList />} />
          <Route path="/ProductDetail" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
