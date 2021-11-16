import React, { useState } from "react";

import { Input } from "vercel-style";

// import styles from "../styles/components.module.css";

interface SearchProps {
  searchAction: Function;
}

const Search: React.FC<SearchProps> = ({ searchAction }): JSX.Element => {
  const [query, setQuery] = useState<string>("");

  function triggerSearchAction(event: any): void {
    setQuery(event.target.value);
    // event.preventDefault(); // prevent browser reload
    searchAction(query); // carry the saerch action
  }

  return (
    <Input
      placeholder="Search"
      clearable
      value={query}
      onChange={(e) => triggerSearchAction(e)}
    />
  );
};

export default Search;
