"use client"
import { useOnKeyPress } from "@/hooks";
import { useState } from "react";

interface Props {
	startSearch?: string,
	submitSearch: Function
}

function SearchBar({startSearch, submitSearch} : Props) {
	const [search, setSearch] = useState(startSearch || "");
	useOnKeyPress(["Enter"], () => submitSearch(search));
	return (
    	<div className="search-box">
        	<i className="fa fa-search" aria-hidden="true" onClick={() => submitSearch(search)}/>
        	<input 
            	type="text"
            	placeholder="Search..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
        	/>
    	</div>
  	)
}

export default SearchBar