import React, { useEffect, useState } from "react";
import UseProductGet from "../../custom-hooks/ProductGet";
import SelectComponent from "../../components/SelectComponent";
import ProductTable from "./components/ProductTable";
import ProductTableFooter from "./components/ProductTableFooter";
import { filter_options, sort_options } from "../../helpers/MockData";
import SearchBar from "../../components/GenericSearchBar";

const ProductList: React.FC = () => {
  const { productData, isLoading, error } = UseProductGet();
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [filterField, setFilterField] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedProducts, setSortedProducts] = useState([...productData]);
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
  };

  const handleSortChange = (value: string) => {
    if (value === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(value);
      setSortDirection(value.includes("Desc") ? "desc" : "asc");
    }
  };

  const handleFilterChange = (value: string) => {
    setFilterField(value);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCategoryProducts = productData.filter((product) =>
      product.category.toLowerCase().includes(categoryFilter.toLowerCase())
    );

    if (sortField.includes("name")) {
      filteredProducts.sort((a, b) =>
        sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else if (sortField.includes("price")) {
      filteredProducts.sort((a, b) =>
        sortDirection === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    setSortedProducts(filteredCategoryProducts);
  }, [searchTerm, sortField, sortDirection, productData, categoryFilter]);


  const uniqueCategories = [
    { value: '', label: 'Seçiniz' },
    ...Array.from(new Set(productData.map((el) => el.category))).map((category) => ({
      value: category,
      label: category,
    })),
  ];
  

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
     
      default:
        return null;
    }
  };

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
          placeholder="Filtrele"
          options={filter_options}
        />
        {renderComponent(filterField)}
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
