import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { Link } from "react-router-dom"
import { thunkCurrentUserBookings, thunkOneBooking } from "../../store/booking";
import OpenModalButton from "../OpenModalButton";

import DeleteBooking from "./DeleteBooking";



const GetCurrentBookings = () => {
    const dispatch = useDispatch()

    const bookingsObj = useSelector(state => state.booking.currentUserBookings)
    const bookingsArr = Object.values(bookingsObj)
    // console.log("I am inside the currentBookings!====>", bookingsArr)
    // console.log("This is state in bookings", bookingsArr)
    useEffect(() => {
        dispatch(thunkCurrentUserBookings())
    }, [dispatch])


    return (
        <>
            {bookingsArr.length > 0 ? (<>{bookingsArr.map(booking => (
                <>
                    <h2>booking id: {booking.id}</h2>
                    <p> category: {booking.category} </p>
                    <p> city: {booking.city} </p>
                    <p> duration: {booking.duration} </p>
                    <p> details: {booking.details} </p>
                    <p> user_id: {booking.user_id} </p>
                    <p> tasker_id: {booking.tasker_id} </p>
                    <p> created_at: {booking.created_at} </p>
                    <p> updated_at: {booking.updated_at} </p>
                    <Link to={`/booking/${booking.id}`}>
                        <button>
                            Edit Booking
                        </button>
                    </Link>
                    <OpenModalButton
                        buttonText="Delete Booking"
                        modalComponent={<DeleteBooking bookingId={booking.id} />}
                    />
                </>
            ))}</>) : (<h1>You have no bookings. Check out these taskers Below!</h1>)}

        </>
    )
}
export default GetCurrentBookings
