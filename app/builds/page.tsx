'use client'

import { BuildsList, Loading, Pagination, SearchBar, SortBy } from "@/components"
import { AuthContext } from "@/context/AuthContext";
import { PAGE_ITEM_LIMIT, SORT_OPTIONS } from "@/helpers/consts";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface Props {
	searchParams: {
	  page?: number,
	  sort?: string,
	  search?:string
	}
  }

function Builds({searchParams: {page, sort, search}} : Props) {
	const { currentUser } = useContext(AuthContext);
	const router = useRouter();
	page = Number(page) ? Number(page) : 1
	sort = SORT_OPTIONS.includes(sort?.toLowerCase() || "") ? sort?.toLowerCase() : SORT_OPTIONS[0];
	search = search || "";
	
	const [isLoading, setLoading] = useState(true);

	const [buildsData, setBuildsData] = useState<any[]>([]);
	const [pageCount, setPageCount] = useState(1);

	const paginationOnClick = (pageNum: number) => {
		router.push(`/builds?sort=${sort}&page=${pageNum}&search=${search}`);
	}
	
	const submitSearch = (search: string) => {
		router.push(`/builds?sort=${sort}&page=${page}&search=${search}`)
	}

	useEffect(() => {
		document.title =  `Elden Builder - View Builds`
	}, []);

	useEffect(() => {
		const getBuilds = async () => {
			await fetch(process.env.NEXT_PUBLIC_API_URL + `builds?page=${page}&sort=${sort}&search=${search}`, {
				method: "GET",
				headers: {
					"Authorization" : `Bearer ${currentUser?.accessToken}` 
				},
			})
			.then(res => {
				if (!res.ok) throw Error;
				return res.json();
			}) 
			.then(data => {
				setBuildsData(data.builds);
				setPageCount(Math.ceil(data.totalCount / PAGE_ITEM_LIMIT));
			})
			.catch(error => {})
			.finally(() => setLoading(false));
		}

		setLoading(true);
        const timeout = setTimeout(() => {
            getBuilds();
        }, 600);
      
        return () => clearTimeout(timeout);
	}, [currentUser, page, sort, search]);


	return (
    <div className="builds">
      	<div className="page-content">
        	<div className="header unselectable">
				<SearchBar startSearch={search} submitSearch={submitSearch}/>
				<div style={{borderLeft: "1px solid grey", height:"25px"}}/>
				<SortBy selected={sort} search={search}/>
            </div>
			<div style={{height: "40px", width:"100%"}}/>
			{
				isLoading ? 
				<div style={{height: "80vh"}}><Loading/></div> :
				<BuildsList buildsData={buildsData}/>
			}
			{
				(buildsData.length > 0 && !isLoading) &&
				<>
				<div style={{height: "64px", width:"100%"}}/>
				<Pagination 
					numPages={pageCount} 
					currPage={page || 1} 
					onClick={paginationOnClick}
				/>
				<div style={{height: "64px", width:"100%"}}/>
				</>
			}
			
      	</div>
    </div>
  )
}

export default Builds