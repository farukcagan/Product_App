import React, { useState } from "react";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";

interface SearchBarProps<T> {
  placeholder?: string;
  onSearch: (query: string) => void;
}

function SearchBar<T>({ placeholder = "Ara", onSearch }: SearchBarProps<T>) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder={placeholder}
        aria-label="Search"
        aria-describedby="basic-addon2"
        value={searchQuery}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <Button variant="outline-secondary" id="button-addon2" onClick={handleSearch}>
        <i className="bi bi-search"></i>
      </Button>
    </InputGroup>
  );
}

export default SearchBar;
