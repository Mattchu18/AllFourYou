import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkCurrUserReviews } from '../../store/review';
import { thunkAllTaskers } from '../../store/taskers';
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "./DeleteReview";
import EditReview from "./EditReview";
import "./CurrentUserReviews.css"

const GetCurrentReviews = () => {
  const dispatch = useDispatch()
  const reviews = useSelector(state => state.review.currentUserReviews)

  const allTaskers = useSelector(state => state.tasker.allTaskers)
  // const reviewedTasker = Object.values(allTaskers).find(tasker => tasker.id === reviews)

  useEffect(() => {
    dispatch(thunkCurrUserReviews())
    dispatch(thunkAllTaskers())
  }, [dispatch])

  // display star rating by rating number
  const starDisplay = (star_rating) => {
    const starsArr = []
    for (let i = 0; i < star_rating; i++) {
      starsArr.push(<i className="fas fa-star" ></i>)
    }
    return starsArr
  }
  // display average rating
  let totalReviews = 0
  let totalRating = 0
  Object.values(reviews).forEach((review) => {
    totalRating += review.star_rating
    totalReviews++
  })

  const averageRating = totalRating / totalReviews


  if (!reviews) return "loading.."
  return (
    <div className="entire-review-container-center">


      <div className="entire-review-container">
        {totalReviews !== 0 ? <h2 className="header">Manage your reviews</h2> : <h2 className="header">You have no reviews</h2>}

        {
          averageRating && totalReviews !== 0 ? (
            <div>
              <div className="review-averages">
                <div className="stats">
                  <span>Your average rating  <i className="fas fa-star"></i>({averageRating.toFixed(1)})
                   <br/>
                   <br/>
                   Your total reviews <i className="fas fa-comment-dots"></i> ({totalReviews})</span>
                </div>
              </div>
            </div>
          ) : null
        }
        <div className="review-card-container">

          {Object.values(reviews).map(review => {
            const reviewedTasker = Object.values(allTaskers).find(tasker => tasker.id === review.tasker_id)
            return (
              <div className="review-container">
                <div className="review">
                  <div className="reviewed-tasker">
                    <img className="reviewed-tasker-profile-image" src={reviewedTasker && reviewedTasker.profile_image} />
                    <NavLink
                            className="view-tasker"
                            exact
                            to={`/taskers/${reviewedTasker && reviewedTasker.id}`}
                          >
                            <div className="view-tasker-profile">
                              View Tasker Profile
                            </div>
                          </NavLink>
                  </div>
                  <div className="rating-review-container">

                    <h3>Review for {reviewedTasker && reviewedTasker.first_name}</h3>
                    <div className="star-rating-container">
                      {starDisplay(review?.star_rating)}
                    </div>
                    <div className="review-body">
                      {review?.review_text}
                    </div>
                  </div>
                </div>
                <div className="review-buttons-div">
                  <div className="buttons-div">

                    <OpenModalButton
                      buttonText='Edit'
                      modalComponent={<EditReview review={review} />}
                    />
                  </div>
                  <div className="buttons-div">
                    <OpenModalButton
                      className="one-button"
                      buttonText='Delete'
                      modalComponent={<DeleteReview review={review} />}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GetCurrentReviews
