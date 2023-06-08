import React, {useState} from 'react'
import "./index.css"

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


const handleSearch = ()=>{
    fetch(`/api/search/?query=${searchInput}`)
    .then((response)=> response.json())
    .then((data)=> setSearchResults(data.results))
    .catch((error)=>console.error(error))
}

const highlightText = (text) => {
    const lowerCaseText = text.toLowerCase();
    const lowerCaseSearchInput = searchInput.toLowerCase();
    const parts = [];
    let startIndex = 0;
    
    if(!searchInput){
        return text;
    }

    while (startIndex < text.length) {
      const index = lowerCaseText.indexOf(lowerCaseSearchInput, startIndex);
      if (index === -1) {
        parts.push(text.substr(startIndex));
        break;
      }
      parts.push(text.substring(startIndex, index));
      parts.push(
        <span className="highlighted">
          {text.substr(index, searchInput.length)}
        </span>
      );
      startIndex = index + searchInput.length;
    }
  
    return parts;
  };
return (
    <div>
        <input
        type = "search"
        placeholder="Search task"
        onChange = {handleChange}
        value = {searchInput}
        onKeyDown={enter}
        />
    <button onClick={handleSearch}>Search</button>
    {searchResults?.length>0 ? (
        searchResults.map((result)=>(
            <>
            <div key={result?.id}>{highlightText(result?.bio)}</div>
            {/* <div>{result?.city}</div> */}
            <div>{highlightText(result?.city)}</div>
            <div>contact tasker: email: {highlightText(result?.email)}, phone number:{highlightText(result?.phone)}</div>
            {/* <div>contact tasker: email: {result?.email}, phone number:{result?.phone}</div> */}
            <div>{result?.profile_image}</div>
            {result.tasks.map((task)=>(
                <>

                {/* <div>{task?.category}</div> */}
                <div>{highlightText(task?.category)}</div>
                {/* <div>{task?.description}</div> */}
                <div>{highlightText(task?.description)}</div>
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