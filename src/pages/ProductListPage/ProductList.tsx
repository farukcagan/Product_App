import React, { useState, useEffect } from "react";
import SelectComponent from "../../components/SelectComponent";
import useProductGet from "../../custom-hooks/ProductGet";
import { sort_options } from "../../helpers/MockData";
import { ProductModels } from "../../models/model";
import ProductTable from "./components/ProductTable";
import ProductTableFooter from "./components/ProductTableFooter";

interface Filters {
  sortField: string;
  sortDirection: string;
  sortedProducts: ProductModels[];
}

const ProductList: React.FC = () => {
  const { productData } = useProductGet();

  const [filters, setFilters] = useState<Filters>({
    sortField: "",
    sortDirection: "",
    sortedProducts: [],
  });

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortedProducts: [...productData],
    }));
  }, [productData]);

  const handleSortChange = (value: string) => {
    const sortDirection =
      value === filters.sortField
        ? filters.sortDirection === "asc"
          ? "desc"
          : "asc"
        : value.includes("Desc")
        ? "desc"
        : "asc";

    const sortedProducts = [...filters.sortedProducts].sort(
      (a: any, b: any) => {
        if (sortDirection === "asc") {
          return a[value] > b[value] ? 1 : -1;
        } else {
          return a[value] < b[value] ? 1 : -1;
        }
      }
    );

    setFilters({
      sortField: value,
      sortDirection,
      sortedProducts,
    });
  };

  const total_product_count = filters.sortedProducts.length;

  const table_header = [
    "Fotoğraf",
    "İsim",
    "Kategori",
    "Fiyat",
    "Para Birimi",
    "Renk",
    "Ürün Detayı",
  ];

  return (
    <div className="card p-5 bg-light container mt-4 mb-2">
      <h1 className="text-left">Ürün Listesi</h1>
      <div className="d-flex gap-2 mb-3 justify-content-end">
        <SelectComponent
          height={40}
          onChange={handleSortChange}
          placeholder="Sırala"
          options={sort_options}
        />
      </div>
      <div className="row">
        <div className="col">
          <ProductTable
            headings={table_header}
            products={filters.sortedProducts}
          />
        </div>
      </div>
      <div className="row">
        <div className="col mt-4">
          <ProductTableFooter totalProduct={total_product_count} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
