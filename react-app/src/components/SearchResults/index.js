import React, { useEffect, useState} from 'react'
import "./index.css"
import { Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom';

import SearchBar from '../SearchBar';

const SearchResults = () =>{
const history=useHistory()
const [searchResults, setSearchResults] = useState([])
const allTaskersObj = useSelector(state => state.tasker.allTaskers)
const allTaskers = Object.values(allTaskersObj)
console.log(allTaskers[0])
const location = useLocation();
const searchInput = new URLSearchParams(location.search).get("query") || "";


useEffect(() => {
    handleSearch();
  }, [searchInput]);
// const handleChange = (e) => {
//     e.preventDefault();
    // setSearchInput(e.target.value)
// }

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
        <SearchBar searchInput={searchInput} handleSearch={handleSearch}/>
        {/* <input
        type = "search"
        placeholder="Search task"
        // onChange = {handleChange}
        value = {searchInput}
        onKeyDown={enter}
        /> */}
    {/* <button onClick={handleSearch}>Search</button> */}
    {searchResults?.length>0 ? (
        searchResults.map((result)=>(
            <>
            <Fragment>
            <div key={result?.id}>{highlightText(result?.bio)}</div>
            <div>{highlightText(result?.city)}</div>
            <div>contact tasker: email: {highlightText(result?.email)}, phone number:{highlightText(result?.phone)}</div>
            <div>{result?.profile_image}</div>
            {result.tasks.map((task)=>(
                <>

                <div>{highlightText(task?.category)}</div>
                <div>{highlightText(task?.description)}</div>
                </>
            ))}
</Fragment>
            <br></br>

            </>


))
): 
(
    <div> Sorry, no Results found :( </div>
    )
    }  

   
    </div>
)
}

export default SearchResults;