import React from "react";
import { Link } from "react-router-dom";
import { ProductModels } from "../../../models/model";


interface ProductRowProps {
  product: ProductModels;
}

export const ProductTableRow: React.FC<ProductRowProps> = ({ product }) => {
  const { id, name, category, price, currency, color, image_name } = product;


  return (
    <tr key={id}>
      <td>
        <img
          src={`/media/${image_name}.png`}
          alt=""
          style={{ width: "45px", height: "45px" }}
          className="img-fluid rounded"
        />
      </td>
      <td>{name}</td>
      <td>{category}</td>
      <td>{`${price} ${currency}`}</td>
      <td>{currency}</td>
      <td>
        <div
          style={{
            width: "20px",
            height: "20px",
            border: "1px solid grey",
            backgroundColor: color,
          }}
        ></div>
      </td>
      <td>
        <Link to={`/product-detail/${id}`}>
          <i style={{ cursor: "pointer" }} className="bi bi-layout-text-window text-black"></i>
        </Link>
      </td>
    </tr>
  );
};
