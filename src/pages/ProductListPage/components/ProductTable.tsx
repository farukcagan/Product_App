import React from "react";
import { ProductTableRow } from "./ProductTableRow";

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
  headings: string[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products, headings }) => {
  return (
    <div className="table-responsive" style={{ height: "400px", overflow: "auto" }}>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            {headings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;


