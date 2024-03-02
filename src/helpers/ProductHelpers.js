export const filterProducts = (products, searchTerm, categoryFilter, colorFilter) => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.category.toLowerCase().includes(categoryFilter.toLowerCase()) &&
        product.color.toLowerCase().includes(colorFilter.toLowerCase())
    );
  };
  
  export const sortProducts = (products, sortField, sortDirection) => {
    if (sortField.includes("name")) {
      return products.sort((a, b) =>
        sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
    } else if (sortField.includes("price")) {
      return products.sort((a, b) =>
        sortDirection === "asc" ? a.price - b.price : b.price - a.price
      );
    }
    return products;
  };