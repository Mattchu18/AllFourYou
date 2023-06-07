import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrentUserBookings } from "../../store/booking";

const GetCurrentBookings = () => {
    const dispatch = useDispatch()

    const bookingsObj = useSelector(state => state.booking.currentUserBookings)

    const bookingsArr = Object.values(bookingsObj)
    console.log("This is state in bookings", bookingsArr)
    useEffect(() => {
        dispatch(thunkCurrentUserBookings())
    }, [dispatch])

    return (
        <>
            {bookingsArr.map(booking => (
                <>
                    <h2>booking id: {booking.id}</h2>
                    <p> category: {booking.category} </p>
                    <p> city: {booking.city} </p>
                    <p> duration: {booking.duration} </p>
                    <p> details: {booking.details} </p>
                    <p> user_id: {booking.user_id} </p>
                    <p> created_at: {booking.created_at} </p>
                    <p> updated_at: {booking.updated_at} </p>

                </>
            ))}
        </>
    )
}
export default GetCurrentBookings
