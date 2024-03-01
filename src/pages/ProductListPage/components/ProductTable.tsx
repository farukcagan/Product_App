import React, { FC } from "react";

interface Product {
  id: number;
  price: number;
  name: string;
  category: string;
  currency: string;
  image_name: string;
  color: string;
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable: FC<ProductTableProps> = ({ products }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Photo</th>
            <th>Adı</th>
            <th>Kategorisi</th>
            <th>Fiyatı</th>
            <th>Para Birimi</th>
            <th>Ürün Detay</th>
          </tr>
        </thead>
        <tbody>
          {products.map(
            ({ id, name, category, price, currency, image_name, color }) => (
              <tr key={id}>
                <td style={{ backgroundColor: color }}>
                  <img
                    src={`/media/${image_name}.png`}
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="img-fluid rounded"
                  />
                </td>
                <td style={{ backgroundColor: color }}>{name}</td>
                <td style={{ backgroundColor: color }}>{category}</td>
                <td
                  style={{ backgroundColor: color }}
                >{`${price} ${currency}`}</td>
                <td style={{ backgroundColor: color }}>{currency}</td>
                <td style={{ backgroundColor: color }}>
                  <i
                    style={{ cursor: "pointer" }}
                    className="bi bi-files cursor-pointer"
                  ></i>
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
