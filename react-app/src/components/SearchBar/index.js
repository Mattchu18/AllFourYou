import React, { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { thunkAllTaskers } from "../../store/taskers";
import {
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

const SearchBar = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const allTaskersObj = useSelector((state) => state.tasker.allTaskers);
  const allTaskers = Object.values(allTaskersObj);

  useEffect(() => {
    dispatch(thunkAllTaskers());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const enter = (e) => {
    if (e.key === "Enter") {
      history.push(`/results?query=${searchInput}`);
    }
  };

  return (
    <div className="home">
      <div className="search-container">
        <div className="book-your-next-task">
          <h1 className="h2-book-next">Book your next Task</h1>
        </div>
        <div className="search-card">
          <input
            className="search-bar"
            type="search"
            placeholder="See below for some categories to search"
            onChange={handleChange}
            value={searchInput}
            onKeyDown={enter}
          />

          <NavLink
            className="home-link-search"
            to={{ pathname: "/results", search: `?query=${searchInput}` }}
          >
            <div className="search-home-button">
              <button hidden className="home-button-search">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </NavLink>
        </div>
      </div>
      {location.pathname !== "/results" && (
        <>
          <div className="home-top-taskers">
            <div className="container-ikea">
              <img
                className="bunny-yellow"
                src="https://www.taskrabbit.com/v3/assets/_/_/_/_/_/_/_/apps/web/app/assets/images/web/dashboard/active-task-dashboard-img-da2fc974db98b71b4da8eef8f25db4fb.png"
              />
              <div className="ikea-1">
                <h2 className="how-panda-use">
                  How do you use your TaskPanda Account?
                </h2>
                <h3 className="how-panda-use">
                  A select below feature to recieve special offers coming soon!
                </h3>
              </div>
            </div>

            <div className="partnered">
              <div>
                {" "}
                <i className="fas fa-star stars-home"></i>
                <i className="fas fa-star stars-home"></i>
                <i className="fas fa-star stars-home"></i>
                <i className="fas fa-star stars-home"></i>
                <i className="fas fa-star stars-home"></i>
              </div>

              <p> 10+ Reviews</p>
              <img
                className="app-academy-logo"
                src="https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.webp"
              />
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
                      <div className="popular-taskers-home">Popular</div>
                      <React.Fragment key={tasker.id}>
                        <div>
                          <NavLink exact to={`/taskers/${tasker.id}`}>
                            <img className="imags" src={tasker.profile_image} />
                          </NavLink>
                        </div>
                        <div className="fist-last-name-home">
                          {tasker.first_name}
                          {tasker.last_name}
                        </div>
                        <div className="container-avalable-elite">
                          <div>
                            {tasker.available ? "Available" : "Not Available"}
                          </div>

                          <div className="about-tasker">
                            <div className="hr"></div>

                            <p className="elite-tasker">Elite Tasker</p>
                            <hr></hr>
                          </div>
                        </div>
                        <div className="tools-bio">
                          <div className="ha city">
                            <i className="fas fa-city"> </i>
                            {tasker.city}
                          </div>
                          <div className="ha prices">
                            <i className="fas fa-money-bill"> </i>
                            {tasker.hourly_rate}
                          </div>
                          <div className="ha vehicles">
                            <i className="fas fa-truck"> </i>
                            {tasker.vehicles}
                          </div>

                          <NavLink
                            className="view-tasker"
                            exact
                            to={`/taskers/${tasker.id}`}
                          >
                            <div className="view-tasker-profile">
                              View Tasker Profile
                            </div>
                          </NavLink>
                        </div>

                        <br />
                      </React.Fragment>
                    </div>
                  );
                }

                return null;
              })}{" "}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
