import React, { useEffect, useState } from "react";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";

interface SearchBarProps<T> {
  placeholder?: string;
  onSearch: (query: string) => void;
  filterText: string;
}

function SearchBar<T>({
  placeholder = "Ara",
  onSearch,
  filterText,
}: SearchBarProps<T>) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <InputGroup className="mb-3" style={{ maxWidth: "200px" }}>
      <FormControl
        placeholder={placeholder}
        aria-label="Search"
        aria-describedby="basic-addon2"
        value={filterText}
        onChange={handleChange}
      />
      <Button variant="outline-secondary" id="button-addon2">
        <i className="bi bi-search"></i>
      </Button>
    </InputGroup>
  );
}

export default SearchBar;
