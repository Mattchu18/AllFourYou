import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkSingleTasker } from "../../store/taskers";
import { thunkAllReviews } from "../../store/review";
import { useParams } from 'react-router-dom';
import CreateReview from "../Reviews/CreateReview";
import OpenModalButton from "../OpenModalButton";
import { thunkCurrentUserBookings } from "../../store/booking";
import { NavLink } from 'react-router-dom';
import './SingleTasker.css'
const GetSingleTasker = () => {
    const dispatch = useDispatch()
    const { taskerId } = useParams()
    const singleTasker = useSelector(state => state.tasker.singleTasker[taskerId])
    const allReviews = useSelector(state => state.review.allReviews)
    const allReviewsArr = Object.values(allReviews)
    const currUser = useSelector(state => state.session.user)
    const allBookings = useSelector(state => state.booking.currentUserBookings)
    const allBookingsArr = Object.values(allBookings)


    const allowed = allBookingsArr.filter(booking => (currUser?.id === booking.user_id))
    const checkBookings = []

    allowed.forEach(booking => {
        if (booking.tasker_id === parseInt(taskerId))
            return checkBookings.push(booking.tasker_id)
    })

    useEffect(() => {
        dispatch(thunkSingleTasker(taskerId))
        dispatch(thunkAllReviews())
        dispatch(thunkCurrentUserBookings())
    }, [dispatch, taskerId])
    const allTaskerRev = allReviewsArr.filter(review => review.tasker_id === parseInt(taskerId))
    const checkReviews = []

    if (!singleTasker) return "This tasker does not exist"
    allTaskerRev.forEach(rev => checkReviews.push(rev.user_id))
    return (
        <>
            <div className="single-tasker-main-container">

                <div className="single-img-container">
                    <img className="single-tasker-img" src={singleTasker.profile_image} />
                    <div className="single-tasker-name">
                        {singleTasker.first_name} {singleTasker.last_name}
                    </div>
                    <div className="about-me-container">
                        <h4 className="single-about-me">About Me:</h4>
                        <div className="single-tasker-about-me">
                            {singleTasker.bio}
                        </div>
                    </div>

                </div>

                <div className="single-tasker-other-info">
                    {!currUser ? <h2>Sign up to book this tasker!</h2> : null}

                    {currUser && ((singleTasker.available === true) ?
                        (<div className="book-tasker-header">
                            <h1>This tasker is available to book!</h1>
                            <NavLink className="book-tasker-link" exact to={`/${singleTasker.id}/bookings/new`}>Book this Tasker</NavLink>
                        </div>)
                        :
                        <h1>This tasker is unavailable at the moment</h1>)}

                    <div className="single-tasker-city-tools-etc">
                        <h3 className="single-tasker-my-skills">My Skills: </h3>
                        <div>
                            {singleTasker.city}
                        </div>
                        <div>
                            {singleTasker.email}
                        </div>
                        <div>
                            {singleTasker.phone_number}
                        </div>

                        <div>
                            {singleTasker.tools}
                        </div>
                        <div>
                            {singleTasker.vehicles}
                        </div>
                    </div>


                    {currUser ? ((checkReviews.includes(currUser.id) || !(checkBookings.includes(parseInt(taskerId))))) ? null :
                        <OpenModalButton
                            buttonText='Post Your Review!'
                            modalComponent={<CreateReview taskerId={singleTasker.id} />}
                        />
                        : null}


                    <br></br>
                    <div>
                        <div className="single-tasker-reviews-container">
                            <h3 className="single-tasker-review">Reviews:</h3>
                            <h3 className="single-tasker-review">Reviews:</h3>
                            {allTaskerRev.length > 0 ? (allTaskerRev.map(rev => {

                                return (
                                    <>
                                        <div className="single-tasker-reviews">

                                            <div>
                                                <i className="fas fa-star"> {rev.star_rating}</i>
                                            </div>
                                            <div>
                                                {rev.review_text}
                                            </div>
                                        </div>


                                    </>
                                )
                            })) : "Book and be the first to Review!"}   </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default GetSingleTasker
