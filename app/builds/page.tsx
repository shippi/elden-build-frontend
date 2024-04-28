'use client'

import { BuildsList, Loading, Pagination, SearchBar, SortBy } from "@/components"
import { PAGE_ITEM_LIMIT, SORT_OPTIONS } from "@/helpers/consts";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

function Builds() {
	const searchParams = useSearchParams();
	const page = Number(searchParams.get("page")) ? Number(searchParams.get("page")) : 1
	const sort = SORT_OPTIONS.includes(searchParams.get("sort")?.toLowerCase() || "") ? searchParams.get("sort")?.toLowerCase() : SORT_OPTIONS[0];
	const [isLoading, setLoading] = useState(true);

	const [builds, setBuilds] = useState<any[]>([]);
	const [pageCount, setPageCount] = useState(1);
	console.log(pageCount)
	useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_API_URL + `builds?page=${page}&sort=${sort}`)
		.then(res => {
			if (!res.ok) throw Error;
			return res.json();
		}) 
		.then(data => {
			setBuilds(data.builds);
			setPageCount(Math.ceil(data.totalCount / PAGE_ITEM_LIMIT));
		})
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
				<div style={{height: "80vh"}}><Loading/></div> :
				<BuildsList builds={builds}/>
			}
			{
				//builds.length > 0 &&
				<>
				<div style={{height: "48px", width:"100%"}}/>
				<Pagination numPages={16} currPage={page} />
				<div style={{height: "128px", width:"100%"}}/>
				</>
			}
			
      	</div>
    </div>
  )
}

export default Builds