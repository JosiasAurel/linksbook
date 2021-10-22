import React, { useState } from "react";

import styles from "../styles/components.module.css";

interface SearchProps {
    searchAction: Function
}

const Search: React.FC<SearchProps> = ({ searchAction }): JSX.Element => {

    const [query, setQuery] = useState<string>("");

    function triggerSearchAction(event: any): void {
        event.preventDefault(); // prevent browser reload
        searchAction(query); // carry the saerch action
    }
    return (
        <form className={styles.searchForm} onSubmit={e => triggerSearchAction(e)}>
            <input value={query} onChange={e => setQuery(e.target.value)} type="text" placeholder="Search for link" />
            <button onClick={e => searchAction(query)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="search"><rect width="24" height="24" opacity="0" /><path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" /></g></g></svg>
            </button>
        </form>
    )
}

export default Search;