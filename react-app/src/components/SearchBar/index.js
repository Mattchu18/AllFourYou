import React, { useEffect, useState} from 'react'
import "./index.css"

import { useDispatch, useSelector } from "react-redux";
import { thunkAllTaskers } from '../../store/taskers';
import { NavLink,useHistory ,useLocation} from 'react-router-dom/cjs/react-router-dom.min';

const SearchBar = () =>{
const history=useHistory()
const location=useLocation()
const dispatch = useDispatch()
const [searchInput, setSearchInput] = useState("")
const [searchResults, setSearchResults] = useState([])
const allTaskersObj = useSelector(state => state.tasker.allTaskers)
const allTaskers = Object.values(allTaskersObj)

useEffect(() => {
    dispatch(thunkAllTaskers())
}, [dispatch])

const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)
}

const enter =(e)=>{
    if (e.key==='Enter'){
        history.push(`/results?query=${searchInput}`);
    }
}
//need to add event listener to submit when pressing enter.


// const handleSearch = ()=>{
//     fetch(`/api/search/?query=${searchInput}`)
//     .then((response)=> response.json())
//     .then((data)=> setSearchResults(data.results))
//     .catch((error)=>console.error(error))
//     history.push('/results')
// }

// const highlightText = (text) => {
//     const lowerCaseText = text.toLowerCase();
//     const lowerCaseSearchInput = searchInput.toLowerCase();
//     const parts = [];
//     let startIndex = 0;
    
//     if(!searchInput){
//         return text;
//     }

//     while (startIndex < text.length) {
//       const index = lowerCaseText.indexOf(lowerCaseSearchInput, startIndex);
//       if (index === -1) {
//         parts.push(text.substr(startIndex));
//         break;
//       }
//       parts.push(text.substring(startIndex, index));
//       parts.push(
//         <span className="highlighted">
//           {text.substr(index, searchInput.length)}
//         </span>
//       );
//       startIndex = index + searchInput.length;
//     }
  
//     return parts;
//   };
 
return (
    <div>
      <input
        type="search"
        placeholder="Search task"
        onChange={handleChange}
        value={searchInput}
        onKeyDown={enter}
      />
      <NavLink to={{ pathname: "/results", search: `?query=${searchInput}` }}>
        <button>Search</button>
      </NavLink>
      {location.pathname !== '/results' && (
        <>
          {allTaskers.map((tasker, index) => {
            if (index < 3) {
              return (
                <React.Fragment key={tasker.id}>
                  <div>
                    <NavLink exact to={`/taskers/${tasker.id}`}>
                      {tasker.profile_image}
                    </NavLink>
                  </div>
                  <div>
                    {tasker.first_name}
                    {tasker.last_name}
                  </div>
                  <div>{tasker.tools}</div>
                  <div>{tasker.bio}</div>
                  <br />
                </React.Fragment>
              );
            }
            return null;
          })}
        </>
      )}
    </div>
  );
  
}

export default SearchBar;