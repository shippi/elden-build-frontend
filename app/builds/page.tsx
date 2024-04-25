function Builds() {
	return (
    	<div className="builds">
      		<div style={{height: "40px"}}/>
      		<div className="page-content">
        	<div className="header">
          		<h1>ELDEN RING BUILDS</h1>
				<div style={{borderLeft: "1px solid grey", height:"25px"}}/>

				<div className="search-box">
                	<i className="fa fa-search" aria-hidden="true"/>
                    <input 
                        type="text"

                        placeholder="Search..."

                    />
                </div>
				<div style={{borderLeft: "1px solid grey", height:"25px"}}/>
				<div className="dropdown-container">
					<div className="select-container">
						<div className="select">Sort By</div>
						<div className="select-icon">
							<i className=" fa fa-angle-down" aria-hidden="true"/>
						</div>
					</div>
			
					<div className="dropdown">
						<br/>
						<ul>
							<li>Recently Updated</li>
							<li>Trending</li>
							<li>Most Viewed</li>
						</ul>
					</div>
				</div>
				
            </div>
      </div>
    </div>
  )
}

export default Builds