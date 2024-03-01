import React, { useState } from "react";
import UseProductGet from "../../custom-hooks/ProductGet";
import SelectComponent from "../../components/SelectComponent";
import ProductTable from "./components/ProductTable";
import ProductTableFooter from "./components/ProductTableFooter";
import { sort_options } from "../../helpers/MockData";

const ProductList: React.FC = () => {
  const { productData, isLoading, error } = UseProductGet();

  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const handleSortChange = (value: string) => {
    if (value === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(value);
      setSortDirection(value.includes("Desc") ? "desc" : "asc");
    }
  };

  const sortedProducts = [...productData];

  if (sortField.includes("name")) {
    sortedProducts.sort((a, b) =>
      sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  } else if (sortField.includes("price")) {
    sortedProducts.sort((a, b) => (sortDirection === "asc" ? a.price - b.price : b.price - a.price));
  }

  return (
    <div className="card p-5 container mt-2 mb-2">
      <h1 className="text-left">Ürün Listesi</h1>
      <div className="mb-3">
        <SelectComponent
          height={40}
          onChange={handleSortChange}
          placeholder="Sırala"
          options={sort_options}
        />
      </div>
      <div className="row">
        <div className="col">
          <ProductTable products={sortedProducts} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ProductTableFooter products={productData} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
