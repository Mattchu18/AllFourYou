import { useDispatch } from "react-redux";
// import { deleteReview } from "../../store/reviews";
import { useModal } from '../../context/Modal'
import { thunkCurrentUserBookings, thunkDeleteBooking, thunkOneBooking } from "../../store/booking";
import { thunkDeleteReview } from "../../store/review";

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
            <h2 className='bookingTitle'>
                Are you sure you want to cancel your booking?
            </h2>
            <div className='deleteRevButt'>

            <button className='cardButt'  onClick={handleDelete}>
                Yes (Delete Booking)
            </button>

            <button className='cardButt' onClick={closeModal}>
                Cancel (Keep Booking)
            </button>
            </div>
        </div>
    )


}

export default DeleteBooking
