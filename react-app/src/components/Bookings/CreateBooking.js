import BookingForm from "./BookingForm";

const CreateBooking = ()=>{
    const newBooking = {
        category:"",
        city:"",
        duration:"",
        details:""
    }

    return(
        <BookingForm
        newBooking={newBooking}
        formType="Create Booking"
        />
    )
}
export default CreateBooking
