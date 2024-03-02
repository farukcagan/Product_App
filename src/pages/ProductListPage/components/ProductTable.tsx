import React, { FC } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  price: number;
  name: string;
  category: string;
  currency: string;
  image_name: string;
  color: string;
  description: string;
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable: FC<ProductTableProps> = ({ products }) => {
  return (
    <div className="table-responsive"  style={{height:"400px",overflow:"auto"}}>
      <table className="table table-striped table-bordered">
        <thead
          className="thead-dark"
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            verticalAlign: "middle",
          }}
        >
          <tr>
            <th>Photo</th>
            <th>Adı</th>
            <th>Kategorisi</th>
            <th>Fiyatı</th>
            <th>Para Birimi</th>
            <th>Renk</th>
            <th>Ürün Detay</th>
          </tr>
        </thead>
        <tbody>
          {products.map(
            ({ id, name, category, price, currency, image_name, color }) => (
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
                    <i
                      style={{ cursor: "pointer" }}
                      className="bi bi-files"
                    ></i>
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
