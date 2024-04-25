import { SearchBar, SortBy } from "@/components"

function Builds() {
	return (
    	<div className="builds">
      		<div style={{height: "40px"}}/>
      		<div className="page-content">
        	<div className="header">
          		<h1>ELDEN RING BUILDS</h1>
				<div style={{borderLeft: "1px solid grey", height:"25px"}}/>
				<SearchBar/>
				<div style={{borderLeft: "1px solid grey", height:"25px"}}/>
				<SortBy/>
				
            </div>
      </div>
    </div>
  )
}

export default Builds