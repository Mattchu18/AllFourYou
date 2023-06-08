import React, { useEffect, useState} from 'react'
import { Fragment } from 'react'
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { thunkAllTaskers } from '../../store/taskers';

const SearchBar = () =>{

    const dispatch = useDispatch()
const [searchInput, setSearchInput] = useState("")
const [searchResults, setSearchResults] = useState([])
const allTaskersObj = useSelector(state => state.tasker.allTaskers)
const allTaskers = Object.values(allTaskersObj)
console.log(allTaskers[0])

useEffect(() => {
    dispatch(thunkAllTaskers())
}, [dispatch])

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
if (!allTaskersObj) return 'loading...'

const handleSearch = ()=>{
    fetch(`/api/search/?query=${searchInput}`)
    .then((response)=> response.json())
    .then((data)=> setSearchResults(data.results))
    .catch((error)=>console.error(error))
}
// let sections;
// const highlight = (result) =>{
//  const searched_input = searchInput.toLowerCase()
// const lower_text = result.toLowerCase()
// const startIndex = lower_text.indexOf(searched_input)
//  const sections = lower_text.split(searchInput)


// return sections.map((section, index)=>{
//     console.log("section=s========>",sections)
//     console.log("section=s======gggg==>",searched_input)
//     console.log("section=s======ggggresult==>",result)


//     if (index === sections.length-1){
//         return section
//     }
//     else {
//         // console.log("section=========>",section)
//         return <Fragment key={index}>
//         {section}
//         <span className="highlight">{result.substr(sections[index].length, searched_input.length)}</span>
//       </Fragment>
//     }
// })
// }


return (
    <div>
        <input
        type = "search"
        placeholder="Search task"
        onChange = {handleChange}
        value = {searchInput}
        />
    <button onClick={handleSearch}>Search</button>
{/* {console.log("search==========>", searchResults)} */}
{/* {console.log("search==========>", sections)} */}

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
): 
(
    <div> Sorry, no Results found :( </div>
    )
    }  

    {allTaskers.map((tasker, index) => {
        if (index < 3) {
            return (
                <>
                <div>
                {tasker.profile_image}
                </div>
                <div>
                {tasker.first_name}
                {tasker.last_name}
                </div>
                <div>
                {tasker.tools}
                </div>
                <div>
                {tasker.bio}
                </div>
                <br></br>
                
                </>
            )   
        }
    })}
    </div>
)
}

export default SearchBar;
