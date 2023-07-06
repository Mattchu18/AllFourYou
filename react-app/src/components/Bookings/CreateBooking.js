import BookingForm from "./BookingForm";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { thunkCurrentUserBookings } from "../../store/booking"
import { useHistory } from "react-router-dom";


const CreateBooking = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { taskerId } = useParams()
    const bookingsObj = useSelector(state => state.booking.currentUserBookings)
    const bookingsArr = Object.values(bookingsObj)

    const booked = bookingsArr.find(booking => booking.tasker_id === parseInt(taskerId))

    useEffect(() => {
        dispatch(thunkCurrentUserBookings())
    }, [dispatch])

    if(booked) {
        history.push("/bookings/all")
    }

    const booking = {
        category: "",
        city: "",
        duration: "",
        details: "",
        tasker_id: taskerId
    }

    return (

        <>
                <BookingForm
                    booking={booking}
                    formType="Create Booking"
                />
        </>
    )
}
export default CreateBooking
