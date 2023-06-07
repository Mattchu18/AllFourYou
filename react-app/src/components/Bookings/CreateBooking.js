import BookingForm from "./BookingForm";
import { useParams } from "react-router-dom"

const CreateBooking = ()=>{
    const { taskerId } = useParams()
    const booking = {
        category:"",
        city:"",
        duration:"",
        details:"",
        tasker_id: taskerId
    }

    return(
        <BookingForm
        booking={booking}
        formType="Create Booking"
        />
    )
}
export default CreateBooking
