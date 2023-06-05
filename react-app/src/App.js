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
          <Route exact path='/reviews' component={GetCurrentUserReviews}/>
          <Route exact path='/reviews/:reviewId' component={EditReview} />
          <Route exact path='/review/:reviewId' component={GetOneReview} />
          <Route exact path='/:taskerId/review/new' component={CreateReview} />
          <Route exact path="/bookings/new" component={CreateBooking}></Route>
          <Route exact path="/bookings/all" component={GetCurrentBookings}></Route>
          <Route exact path="/tasks/all" component={GetAllTasks}></Route>
        </Switch>

      )}
    </>
  );
}

export default App;
