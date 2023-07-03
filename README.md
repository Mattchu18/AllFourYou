# TaskPanda
![taskpandagifvideo](https://github.com/Mattchu18/AllFourYou/assets/123227925/a3e0f5d5-a1f2-4cf5-a920-021fa1662a3c)

TaskPanda is a clone of TaskRabbit. It allows users in need of services to book individuals to help complete those tasks.

## Technologies
### Backend
 * Flask
 * SQLAlchemy
   
### Frontend:
 * React
 * Redux
 * CSS

## Features
1. User authentication
2. Booking
   * Logged in Users can view bookings(READ)
   * Logged in Users can create new booking (CREATE)
   * logged in users can edit booking(EDIT)
   * Logged in users can remove booking(DELETE)
4. Reviews
   * Logged in users can view and manage their reviews (READ)
   * Logged in users can create reviews (CREATE)
   * Logged in users can edit their reviews made (UPDATE)
   * Logged in users can delete reviews(DELETE)
5. Serach Bar
   * Users can search for key words and an associated tasker/s will show.
6. Billing
   * Users can add credit or debit carad information to have on file.
   * They can create and delete cards.
## Code Snippets

For our search feature we wanted to render the search bar on the home page and have the results render on a different page. to Achive this we utiized URLSearchParams to get the data from search params.
```  const [searchResults, setSearchResults] = useState([])
  const allTaskersObj = useSelector(state => state.tasker.allTaskers)
  const allTaskers = Object.values(allTaskersObj)
  console.log(allTaskers[0])
  const location = useLocation();
  const searchInput = new URLSearchParams(location.search).get("query") || "";

```
```  const handleSearch = () => {
    fetch(`/api/search/?query=${searchInput}`)
      .then((response) => response.json()
      )
      .then((data) => setSearchResults(data.results))
      .catch((error) => console.error(error))
  }
```
