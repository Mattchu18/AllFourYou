import React, {useState} from 'react'

const SearchBar = () =>{

const [searchInput, setSearchInput] = useState("")
const [searchResults, setSearchResults] = useState([])


const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)
}

const enter =(e)=>{
    if (e.key==='Enter'){
        e.preventDefault()
        handleSearch()
    }
}
//need to add event listener to submit when pressing enter.


const handleSearch = ()=>{
    fetch(`/api/search/?query=${searchInput}`)
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
{console.log("search==========>", searchResults)}
    {searchResults?.length>0 ? (
        searchResults.map((result)=>(
            <>
            {console.log(result, "jfdl;ajsfkldsfvhasvsa100-----------")}
            <div key={result?.id}>{result?.bio}</div>
            <div>{result?.city}</div>
            <div>contact tasker: email: {result?.email}, phone number:{result?.phone}</div>
            <div>{result?.profile_image}</div>
            {result.tasks.map((task)=>(
                <>

                <div>{task?.category}</div>
                <div>{task?.description}</div>
                </>
            ))}
    
            <br></br>

            </>

        ))
    ): (
        <div> Sorry, no Results found :( </div>
    )}
    </div>
)
}

export default SearchBar;
