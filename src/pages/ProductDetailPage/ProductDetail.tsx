import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseProductWithId from "../../custom-hooks/ProductGetWithId";
import "./ProductDetail.css";
interface ProductData {
  id: number;
  price: number;
  name: string;
  category: string;
  currency: string;
  image_name: string;
  color: string;
  description: string;
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const numericProductId = productId ? parseInt(productId, 10) : undefined;
  const { productData } = UseProductWithId(numericProductId);

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
  }: ProductData = Array.isArray(productData) ? productData[0] : productData;

  return (
    <div className="container">
      <div className="card">
        <div className="container-fluid">
          <div className="wrapper row">
            <div className="preview col-md-6">
              <div className="image-container">
                <img
                  src={`/media/${image_name}.png`}
                  alt={name}
                  className="mb-3 product-image"
                />
              </div>
            </div>
            <div className="details col-md-6">
              <h2 className="product-title">{name}</h2>
              <p>
                <strong>Kategori:</strong> {category}
              </p>
              <p>
                <strong>Fiyat:</strong> {`${price} ${currency}`}
              </p>
              <p>
                <strong>Açıklama:</strong> {description}
              </p>
              <p>
                <strong>Renk:</strong> <span></span>
                {color}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
