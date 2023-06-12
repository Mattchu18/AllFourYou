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
    <div className="home">
      <div className="search-container">
        {/* <div className="tool-box-container">

        <img className="toolbox-red" src="https://media.discordapp.net/attachments/1062942242450460744/1117219657439531058/My_project.png?width=1410&height=937"/>
        </div> */}
        <div className="book-your-next-task">
        <h1 className="h2-book-next">Book your next Task</h1>
        </div>
        <div className="search-card">
          {/* <i className="fas fa-search"></i> */}
                <input
        className="search-bar"
        type="search"
        placeholder="See below for some categories to search"
        onChange={handleChange}
        value={searchInput}
        onKeyDown={enter}
      />




      <NavLink className="home-link-search" to={{ pathname: "/results", search: `?query=${searchInput}` }}>
        <div className="search-home-button">

        <button hidden className="home-button-search"><i className="fas fa-search"></i></button>
        </div>
      </NavLink>
      </div>
 </div>
      {location.pathname !== '/results' && (
        <>
        <div className="home-top-taskers">

        <div className="container-ikea">
          <img className="bunny-yellow" src="https://www.taskrabbit.com/v3/assets/_/_/_/_/_/_/_/apps/web/app/assets/images/web/dashboard/active-task-dashboard-img-da2fc974db98b71b4da8eef8f25db4fb.png"/>
          <div className="ikea-1">

        <h2 className="how-panda-use">How do you use your TaskPanda Account?</h2>
        <h3 className="how-panda-use">A select below feature to recieve special offers coming soon!</h3>
          </div>
        </div>

        <div className="partnered">
          <div> <i className="fas fa-star stars-home"></i>
        <i className="fas fa-star stars-home"></i>
        <i className="fas fa-star stars-home"></i>
        <i className="fas fa-star stars-home"></i>
          <i className="fas fa-star stars-home"></i></div>


<p> 10+ Reviews</p>
<img className="app-academy-logo" src="https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.webp"/>
<p> Partnered with App Academy</p>
        </div>
        <div className="home-h2-tasker">

          <h2>View some of our top taskers!</h2>
          </div>
        <div className="container2">


          {allTaskers.map((tasker, index) => {
            if (index < 3) {
              return (
                <div className="tasker-containers">
                  <div className="popular-taskers-home">
                    Popular
                    </div>
                <React.Fragment key={tasker.id}>
                  <div >
                    <NavLink exact to={`/taskers/${tasker.id}`}>
                      <img className="imags" src={tasker.profile_image}/>
                  </NavLink>

                  </div>
                  <div className="fist-last-name-home">
                    {tasker.first_name}
                    {tasker.last_name}
                  </div>
                  <div className="container-avalable-elite">
                       <div>
                    {tasker.available ? 'Available' : 'Not Available'}
                  </div>

                  <div className="about-tasker">
                  <div className="hr">
                  </div>


                <p className="elite-tasker">Elite Tasker</p><hr></hr>
                  </div>
                  </div>
                  <div className="tools-bio">
                    <div className="ha city">
                    <i className="fas fa-city"> </i>{tasker.city}
                    </div>
                    <div className="ha prices">
                    <i className="fas fa-money-bill"> </i>{tasker.hourly_rate}

                    </div>
                    <div className="ha vehicles">
                    <i className="fas fa-truck"> </i>{tasker.vehicles}

                    </div>
                    {/* <div className="ha tools">

{tasker.tools}
</div> */}
                                        <NavLink className="remove_dec" exact to={`/taskers/${tasker.id}`}>

                    <div className="view-tasker-profile">View Tasker Profile</div>
                    </NavLink>

                      {/* <div>{tasker.tools}</div> */}
                  {/* <div>{tasker.bio}</div> */}
                  </div>

                  <br />
                </React.Fragment>
                </div>
              );
            }

            return null;
          })} </div>
                </div>
        </>
      )}
    </div>
  );

}

export default SearchBar;
