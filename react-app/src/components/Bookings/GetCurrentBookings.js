import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { Link } from "react-router-dom"
import { thunkCurrentUserBookings, thunkOneBooking } from "../../store/booking";
import OpenModalButton from "../OpenModalButton";
import CreateReview from '../Reviews/CreateReview'
import DeleteBooking from "./DeleteBooking";
import { thunkAllReviews } from "../../store/review";
import { thunkAllTasks } from '../../store/task'
import { thunkAllTaskers } from "../../store/taskers";
import GetSingleTasker from "../Taskers/SingleTasker";
import { NavLink } from 'react-router-dom';
import "./GetCurrentBookings.css"

const GetCurrentBookings = () => {
    const dispatch = useDispatch()

    const bookingsObj = useSelector(state => state.booking.currentUserBookings)
    const bookingsArr = Object.values(bookingsObj)
    const allReviews = useSelector(state => state.review.allReviews)
    const currUser = useSelector(state => state.session.user)
    // const allTasks = useSelector(state => state.task.allTasks)
    const findReviews = Object.values(allReviews).filter(review => review.user_id === currUser.id)


    const allTaskersObj = useSelector(state => state.tasker.allTaskers)
    const allTaskersArr = Object.values(allTaskersObj)
    console.log("THIS IS ALLTASKERS OBJ!! ====> ", allTaskersObj)

    const matchedTaskersArr = []
    bookingsArr.forEach(booking => {
        const matchedTasker = allTaskersArr.find(tasker => booking.tasker_id === tasker.id)
        if (matchedTasker) {
            matchedTaskersArr.push(matchedTasker)
        }
    })

    console.log("THIS IS MATCHEDTASKERARRS!!====>", matchedTaskersArr)

    useEffect(() => {
        dispatch(thunkCurrentUserBookings())
        dispatch(thunkAllReviews())
        dispatch(thunkAllTasks())
        dispatch(thunkAllTaskers())
    }, [dispatch])

    return (
        <div id="outer-container">
            <h1>Tasks you've booked</h1>
            <div id="body-container">
                {bookingsArr.length > 0 ?
                    (<div id="bookings-container">
                        {bookingsArr.map(booking => (
                            <div id="tile">
                                <div>
                                    <h2>{booking.category} in {booking.city}</h2>
                                </div>

                                <div>
                                    {matchedTaskersArr.filter(tasker => tasker.id === booking.tasker_id).map(tasker => (
                                        <span key={tasker.id}>With tasker {tasker.first_name}</span>
                                    ))}
                                    <span> duration: {booking.duration} </span>

                                </div>

                                <p> Booked for {booking.updated_at} </p>

                                <div className="buttons-div">

                                    <div className="review">

                                        {findReviews.find(review => review.tasker_id === booking.tasker_id) ?
                                            <button className="reviewed-button" disabled="true">Already reviewed!</button>
                                            :
                                            <OpenModalButton
                                                buttonText="Post Your Review!"
                                                modalComponent={<CreateReview taskerId={booking.tasker_id} />}
                                            />
                                        }
                                    </div>
                                    <Link to={`/booking/${booking.id}`}>
                                        <button>
                                            Edit Booking
                                        </button>
                                    </Link>
                                    <OpenModalButton
                                        buttonText="Delete Booking"
                                        modalComponent={<DeleteBooking bookingId={booking.id} />}
                                    />

                                </div>


                            </div>
                        ))}</div>)
                    :
                    (<h1>You have no bookings. Check out these taskers Below!</h1>)}

            </div>
        </div>
    )
}
export default GetCurrentBookings
