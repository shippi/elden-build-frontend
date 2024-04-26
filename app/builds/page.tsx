'use client'

import { BuildsList, Loading, SearchBar, SortBy } from "@/components"
import { SORT_OPTIONS } from "@/helpers/consts";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

function Builds() {
	const searchParams = useSearchParams();
	const page = Number(searchParams.get("page")) ? Number(searchParams.get("page")) : 1
	const sort = SORT_OPTIONS.includes(searchParams.get("sort")?.toLowerCase() || "") ? searchParams.get("sort")?.toLowerCase() : SORT_OPTIONS[0];

	const [isLoading, setLoading] = useState(true);
	const [builds, setBuilds] = useState<any[]>([]);

	useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_API_URL + `builds?page=${page}&sort=${sort}`)
		.then(res => {
			if (!res.ok) throw Error;
			return res.json();
		}) 
		.then(data => setBuilds(data))
		.catch(error => {})
		.finally(() => setLoading(false));
	}, []);

	return (
    <div className="builds">
      	<div style={{height: "40px"}}/>
      	<div className="page-content">
        	<div className="header unselectable">
				<SearchBar/>
				<div style={{borderLeft: "1px solid grey", height:"25px"}}/>
				<SortBy selected={sort} page={page} />
            </div>
			<div style={{height: "24px", width:"100%"}}/>
			{
				isLoading ? 
				<div style={{height: "70vh"}}><Loading/></div> :
				<BuildsList builds={builds}/>
			}
      	</div>
    </div>
  )
}

export default Builds