import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "../../components/GenericSearchBar";
import SelectComponent from "../../components/SelectComponent";
import UseProductGet from "../../custom-hooks/ProductGet";
import { filter_options, sort_options } from "../../helpers/MockData";
import ProductTable from "./components/ProductTable";
import ProductTableFooter from "./components/ProductTableFooter";
import { filterProducts, sortProducts } from "../../helpers/ProductHelpers";
import useProductGet from "../../custom-hooks/ProductGet";

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

interface Filters {
  sortField: string;
  sortDirection: string;
  filterField: string;
  searchTerm: string;
  categoryFilter: string;
  colorFilter: string;
  resetFilter: boolean;
  sortedProducts: Product[];
}

const ProductList: React.FC = () => {
  const { productData } = useProductGet();

  const [filters, setFilters] = useState<Filters>({
    sortField: "",
    sortDirection: "",
    filterField: "",
    searchTerm: "",
    categoryFilter: "",
    colorFilter: "",
    resetFilter: false,
    sortedProducts: [...productData],
  });

  const handleFilterChange = (value: string) =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      filterField: value,
      resetFilter: true,
    }));

  const handleSearch = (value: string) =>
    setFilters((prevFilters) => ({ ...prevFilters, searchTerm: value }));

  const handleCategoryFilter = (value: string) =>
    setFilters((prevFilters) => ({ ...prevFilters, categoryFilter: value }));

  const handleColorFilter = (value: string) =>
    setFilters((prevFilters) => ({ ...prevFilters, colorFilter: value }));

  const handleSortChange = (value: string) =>
    setFilters((prevFilters) => {
      const sortDirection =
        value === prevFilters.sortField
          ? prevFilters.sortDirection === "asc"
            ? "desc"
            : "asc"
          : value.includes("Desc")
          ? "desc"
          : "asc";
      return { ...prevFilters, sortField: value, sortDirection };
    });

  useEffect(() => {
    const {
      resetFilter,
      searchTerm,
      sortField,
      sortDirection,
      categoryFilter,
      colorFilter,
    } = filters;

    if (resetFilter) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        categoryFilter: "",
        colorFilter: "",
        searchTerm: "",
        resetFilter: false,
      }));
    }

    const filteredProducts = filterProducts(
      productData,
      searchTerm,
      categoryFilter,
      colorFilter
    );
    const sortedProducts = sortProducts(
      filteredProducts,
      sortField,
      sortDirection
    );

    setFilters((prevFilters) => ({
      ...prevFilters,
      sortedProducts,
    }));
  }, [filters, productData]);

  const uniqueCategories = useMemo(
    () => [
      { value: "", label: "Seçiniz" },
      ...Array.from(new Set(productData.map((el) => el.category))).map(
        (category) => ({ value: category, label: category })
      ),
    ],
    [productData]
  );

  const uniqueColors = useMemo(
    () => [
      { value: "", label: "Seçiniz" },
      ...Array.from(new Set(productData.map((el) => el.color))).map(
        (color) => ({ value: color, label: color })
      ),
    ],
    [productData]
  );

  const renderComponent = (filterField: string) => {
    switch (filterField) {
      case "name":
        return (
          <SearchBar placeholder="Ürün adıyla ara" onSearch={handleSearch} />
        );
      case "category":
        return (
          <SelectComponent
            height={40}
            onChange={handleCategoryFilter}
            placeholder="Kategoriye göre filtrele"
            options={uniqueCategories}
          />
        );
      case "color":
        return (
          <SelectComponent
            height={40}
            onChange={handleColorFilter}
            placeholder="Rengine göre filtrele"
            options={uniqueColors}
          />
        );
      default:
        return null;
    }
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
    <div className="card p-5 container mt-2 mb-2">
      <h1 className="text-left">Ürün Listesi</h1>
      <div className="d-flex gap-2 mb-3 justify-content-end">
        <SelectComponent
          height={40}
          onChange={handleSortChange}
          placeholder="Sırala"
          options={sort_options}
        />
        <SelectComponent
          height={40}
          onChange={handleFilterChange}
          placeholder="Filtre Ekle"
          options={filter_options}
        />
        {renderComponent(filters.filterField)}
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
