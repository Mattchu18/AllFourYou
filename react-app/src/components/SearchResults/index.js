import React, { useEffect, useState } from 'react'
import "./index.css"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar';


const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([])
  const location = useLocation();
  const searchInput = new URLSearchParams(location.search).get("query") || "";


  useEffect(() => {
    handleSearch();
  }, [searchInput]);



  const enter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }
  //need to add event listener to submit when pressing enter.


  const handleSearch = () => {
    fetch(`/api/search/?query=${searchInput}`)
      .then((response) => response.json()
      )
      .then((data) => setSearchResults(data.results))
      .catch((error) => console.error(error))
  }

  const highlightText = (text) => {
    const lowerCaseText = text?.toLowerCase();
    const lowerCaseSearchInput = searchInput.toLowerCase();
    const parts = [];
    let startIndex = 0;

    if (!searchInput) {
      return text;
    }

    while (startIndex < text?.length) {
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
    <section className="root">
      <div className='all-results-center'>
        <SearchBar searchInput={searchInput} handleSearch={handleSearch} />

        <div class="all-results">

          {searchResults?.length > 0 ? (
            searchResults.map((result) => (

              <>
                <Link class="link-to-taskers" to={`/taskers/${result.id}`}>
                  <div className="test">

                    <div>

                    </div>
                    <div className="result-card">
                      <div class="profile-pic">
                        <div>
                          <img class="imag" src={result.url} />
                        </div>

                          <button className="contact-button">Contact tasker!</button>


                      </div>

                    </div>

                    <div className="info">
                      <div className="name-price">
                        <div>
                          <h2>{highlightText(result?.firstName)}, {highlightText(result?.lastName[0])}</h2>
                        </div>
                        <div className="price">{highlightText(result?.price)}</div>


                      </div>

                      <div className="tasker-details">
                        <div><i class="fas fa-truck"></i>{highlightText(result?.vehicles)}</div>

                        <div><i className="fas fa-toolbox"></i>{highlightText(result?.tools)}</div>
                      </div>

                      <div className="tasker-bio-card">
                        <div className='text-to-help'>
                          How I can help:
                        </div>


                        <div className="tasker-bio" key={result?.id}>{highlightText(result?.bio)}</div>
                        <div>{highlightText(result?.city)}</div>
                        <div>contact tasker: email: {highlightText(result?.email)}, phone number:{highlightText(result?.phone)}</div>
                        {result.tasks.map((task) => (
                          <>

                            <div>{highlightText(task?.category)}</div>
                            <div>{highlightText(task?.description)}</div>

                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
                <br></br>

              </>



            ))
          ) :
            (
              <div> Sorry, no Results found :( </div>
            )
          }


        </div>

      </div>
    </section>
  )

}

export default SearchResults;
