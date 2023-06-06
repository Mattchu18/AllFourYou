import React, {useState} from 'react'

const SearchBar = () =>{

const [searchInput, setSearchInput] = useState("")
const [searchResults, setSearchResults] = useState([])

const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)
}
const handleSearch = ()=>{
    fetch(`/search?query=${searchInput}`)
    .then((response)=> response.json())
    .then((data)=> setSearchResults(data.results))
    .catch((error)=>console.error(error))
}
return (
    <div>
        <input
        type = "search"
        placeholder="Search task"
        onChange = {handleChange}
        value = {searchInput}
        />
    <button onClick={handleSearch}>Search</button>

    {searchResults.length>0 ? (
        searchResults.map((result)=>(
            <div key={result.id}>{result.name}</div>
        ))
    ): (
        <div> No Results found </div>
    )}
    </div>
)
}

export default SearchBar;
