import { useDispatch } from "react-redux";
// import { deleteReview } from "../../store/reviews";
import { useModal } from '../../context/Modal'
import { thunkCurrentUserBookings, thunkDeleteBooking } from "../../store/booking";

const DeleteBooking = ({ bookingId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()


    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(thunkDeleteBooking(bookingId))
        dispatch(thunkCurrentUserBookings())
        .then(closeModal)
    }

    return (
        <div>
            <h1>
                Are you sure you want to cancel your booking?
            </h1>

            <button onClick={handleDelete}>
                Yes (Delete Booking)
            </button>

            <button onClick={closeModal}>
                Cancel (Keep Booking)
            </button>
        </div>
    )


}

export default DeleteBooking
