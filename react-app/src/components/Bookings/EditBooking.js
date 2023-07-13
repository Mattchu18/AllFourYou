import BookingForm from "./BookingForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkOneBooking } from "../../store/booking";
import { useEffect } from "react";

const EditBooking = () => {
    const dispatch = useDispatch()
    const { bookingId } = useParams()
    const booking = useSelector(state => state.booking.singleBooking[bookingId])



    useEffect(() => {
        dispatch(thunkOneBooking(bookingId))
    }, [dispatch, bookingId])

if(!booking) return "no booking with that id"
    return (

        <>
            <BookingForm
            booking = {booking}
            formType = "Edit Booking"
            />
        </>
    )

}


export default EditBooking
