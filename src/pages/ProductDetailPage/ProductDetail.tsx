import React from "react";
import { useParams } from "react-router-dom";
import useProductWithId from "../../custom-hooks/ProductGetWithId";
import { ProductModels } from "../../models/model";
import "./ProductDetail.css";

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const numericProductId = productId ? parseInt(productId, 10) : undefined;
  const { productData } = useProductWithId(numericProductId);

  if (
    !productData ||
    (Array.isArray(productData) && productData.length === 0)
  ) {
    return (
      <div className="centered-frame">
        <p>Ürün bilgileri yüklenirken bir hata oluştu.</p>
      </div>
    );
  }

  const {
    name,
    price,
    category,
    currency,
    image_name,
    color,
    description,
  }: ProductModels = Array.isArray(productData) ? productData[0] : productData;

  return (
    <div>
      <div className="custom-wrapper">
        <div className="custom-outer">
          <div className="custom-content custom-animated custom-fadeInLeft">
            <span className="custom-bg custom-animated custom-fadeInDown">
              {name}
            </span>
            <h1 className="custom-h1">
              <strong>Kategori: {category}</strong>
            </h1>
            <p className="custom-p">
              <strong>Açıklama: </strong> {description}
            </p>
            <div className="custom-button">
              <p className="custom-p">
                <strong>Fiyat: </strong> {`${price} ${currency}`}
              </p>
              <p className="custom-p">
                <strong>Renk: </strong>
                {color}
              </p>
            </div>
          </div>
          <img
            src={`/media/${image_name}.png`}
            alt={name}
            className="imgproduct"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
