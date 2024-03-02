import { useEffect } from "react";
import { filterProducts, sortProducts } from "../helpers/ProductHelpers";
import { ProductModels } from "../helpers/model";

interface Filters {
  sortField: string;
  sortDirection: string;
  filterField: string;
  searchTerm: string;
  categoryFilter: string;
  colorFilter: string;
  resetFilter: boolean;
  sortedProducts: ProductModels[];
}

const useProductFilters = (
  filters: Filters,
  productData: ProductModels[],
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
): void => {
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
  }, [filters, productData, setFilters]);
};

export default useProductFilters;
