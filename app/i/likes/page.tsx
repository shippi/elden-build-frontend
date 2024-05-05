'use client'

import { BuildsList, Loading, LoginModal, Pagination, SearchBar, SortBy } from "@/components"
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

function Likes({searchParams: {page, sort, search}} : Props) {
	const { currentUser, setLoginOpened } = useContext(AuthContext);
	const router = useRouter();
	page = Number(page) ? Number(page) : 1
	search = search || "";
	
	const [isLoading, setLoading] = useState(true);

	const [buildsData, setBuildsData] = useState<any[]>([]);
	const [pageCount, setPageCount] = useState(1);

	const paginationOnClick = (pageNum: number) => {
		router.push(`/i/likes?page=${pageNum}&search=${search}`);
	}
	
	const submitSearch = (search: string) => {
		router.push(`/i/likes?&page=${page}&search=${search}`)
	}
	useEffect(() => {
		document.title =  `Elden Builder - Likes`
	}, []);
	useEffect(() => {
		const getBuilds = async () => {
			await fetch(process.env.NEXT_PUBLIC_API_URL + `users/${currentUser?.uid}/likes?page=${page}&search=${search}`, {
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
            .finally(() => setLoading(false))
		}
		setLoading(true);
        const timeout = setTimeout(() => {
            if (currentUser) getBuilds();
            else  {
              setLoginOpened(true);
              setLoading(false)
            }
        }, 600);
      
        return () => clearTimeout(timeout);
	}, [currentUser, page, sort, search]);


	return (
    <div className="builds">
      	<div className="page-content">
        	<div className="header unselectable">
                <h1>LIKED BUILDS</h1>
                <div style={{borderLeft: "1px solid grey", height:"25px"}}/>
				<SearchBar startSearch={search} submitSearch={submitSearch}/>
				
				
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

export default Likes