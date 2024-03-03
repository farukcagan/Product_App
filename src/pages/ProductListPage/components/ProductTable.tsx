import React from "react";
import { ProductTableRow } from "./ProductTableRow";
import { ProductModels } from "../../../models/model";

interface ProductTableProps {
  products: ProductModels[];
  headings: string[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products, headings }) => {
  return (
    <div
      className="table-responsive"
      style={{ height: "400px", overflow: "auto" }}
    >
      <table className="table table-striped table-bordered">
        <thead className="thead-dark sticky-thead">
          <tr>
            {headings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductTableRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
