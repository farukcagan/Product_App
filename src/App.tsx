import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "./pages/LoadingPage/LoadingPage";

const ProductList = lazy(() => import("./pages/ProductListPage/ProductList"));
const ProductDetail = lazy(() => import("./pages/ProductDetailPage/ProductDetail"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route
              path="/product-detail/:productId"
              element={<ProductDetail />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
