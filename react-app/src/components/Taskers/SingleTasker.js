import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkSingleTasker } from "../../store/taskers";
import { thunkAllReviews } from "../../store/review";
import { useParams } from 'react-router-dom';
import CreateReview from "../Reviews/CreateReview";
import OpenModalButton from "../OpenModalButton";
import { thunkCurrentUserBookings } from "../../store/booking";
import { NavLink } from 'react-router-dom';

const GetSingleTasker = () => {
    const dispatch = useDispatch()
    const { taskerId } = useParams()
    const singleTasker = useSelector(state => state.tasker.singleTasker[taskerId])
    const allReviews = useSelector(state => state.review.allReviews)
    const allReviewsArr = Object.values(allReviews)
    const currUser = useSelector(state => state.session.user)
    const allBookings = useSelector(state => state.booking.currentUserBookings)
    const allBookingsArr = Object.values(allBookings)


    const allowed = allBookingsArr.filter(booking => (currUser.id === booking.user_id))
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


            <div>
                {singleTasker.bio}
            </div>
            <div>
                {singleTasker.city}
            </div>
            <div>
                {singleTasker.email}
            </div>
            <div>
                {singleTasker.first_name}
            </div>
            <div>
                {singleTasker.last_name}
            </div>
            <div>
                {singleTasker.phone_number}
            </div>
            <div>
                {singleTasker.profile_image}
            </div>
            <div>
                {singleTasker.tools}
            </div>
            <div>
                {singleTasker.vehicles}
            </div>

            {currUser ? ((checkReviews.includes(currUser.id) || !(checkBookings.includes(parseInt(taskerId))))) ? null :
                <OpenModalButton
                    buttonText='Post Your Review!'
                    modalComponent={<CreateReview taskerId={singleTasker.id} />}
                />
                : null}
            <div>
                {singleTasker.available === true ? (<><h1>This tasker is available to book!</h1> <NavLink exact to={`/${singleTasker.id}/bookings/new`}>Book this Tasker</NavLink></>) : <h1>This tasker is unavailable at the moment</h1>}
            </div>

            <br></br>
            <div>
                {allTaskerRev.map(rev => {
                    return (
                        <>
                            <div>
                                {rev.star_rating}
                            </div>
                            <div>
                                {rev.review_text}
                            </div>
                        </>
                    )
                })}
            </div>


        </>
    )
}

export default GetSingleTasker
