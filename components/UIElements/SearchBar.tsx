function SearchBar() {
  return (
    <div className="search-box">
        <i className="fa fa-search" aria-hidden="true"/>
        <input 
            type="text"
            placeholder="Search..."
        />
    </div>
  )
}

export default SearchBar