import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import GetCurrentUserReviews from "./components/Reviews/CurrentUserReviews"
import EditReview from "./components/Reviews/EditReview"
import CreateReview from "./components/Reviews/CreateReview";
import GetOneReview from "./components/Reviews/OneReview";
import GetCurrentBookings from "./components/Bookings/GetCurrentBookings"
import GetAllTasks from "./components/Tasks/GetAllTasks"
import CreateBooking from "./components/Bookings/CreateBooking";
import EditBooking from "./components/Bookings/EditBooking";
import GetAllTaskers from "./components/Taskers/GetAllTaskers";
import GetSingleTasker from "./components/Taskers/SingleTasker"
import SearchBar from "./components/SearchBar";
import GetCurrentCards from "./components/Billing/CurrentUserCards";
import CreateCard from "./components/Billing/CreateCard";
import AccountPage from "./components/AccountPage/AccountPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/" component={SearchBar}></Route>
          <Route exact path='/reviews' component={GetCurrentUserReviews}/>
          <Route exact path='/account' component={AccountPage} />
          {/* <Route exact path='/review/:reviewId' component={GetOneReview} /> 
         <Route exact path='/:taskerId/review/new' component={CreateReview} /> */}
          <Route exact path="/:taskerId/bookings/new" component={CreateBooking}/>
          <Route exact path="/bookings/all" component={GetCurrentBookings}/>
          <Route exact path="/booking/:bookingId" component={EditBooking}/>
          <Route exact path="/tasks/all" component={GetAllTasks}/>
          <Route exact path='/taskers/all' component={GetAllTaskers} />
          <Route exact path="/taskers/:taskerId" component={GetSingleTasker} />
          <Route exact path='/review/:reviewId' component={EditReview} />
          <Route exact path="/billing" component={GetCurrentCards}></Route>
          <Route exact path="/billing/new">{CreateCard}</Route>
        </Switch>

      )}
    </>
  );
}

export default App;
