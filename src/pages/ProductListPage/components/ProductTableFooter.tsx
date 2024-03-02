import React from "react";


interface ProductTableFooterProps {
  totalProduct: number;
}

const ProductTableFooter: React.FC<ProductTableFooterProps> = ({
  totalProduct,
}) => {
  return (
    <div className="card bg-white p-2">
      <div className="d-flex justify-content-end">
        <span className="fs-5 fw-bold p-1">
          Toplam Ürün Sayısı : <span className="fs-5"> {totalProduct}</span>
        </span>
      </div>
    </div>
  );
};

export default ProductTableFooter;
