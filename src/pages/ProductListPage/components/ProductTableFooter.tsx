import React from "react";

interface Product {
  id: number;
  price: number;
  name: string;
  category: string;
  currency: string;
  image_name: string;
  color: string;
  description: string
}

interface ProductTableFooterProps {
  products: Product[];
}

const ProductTableFooter: React.FC<ProductTableFooterProps> = ({
  products,
}) => {
  return (
    <div className="card p-2">
      <div className="d-flex justify-content-end">
        <span className="fs-5 fw-bold">
          Toplam Ürün Sayısı : <span className="fs-5"> {products.length}</span>
        </span>
      </div>
    </div>
  );
};

export default ProductTableFooter;
