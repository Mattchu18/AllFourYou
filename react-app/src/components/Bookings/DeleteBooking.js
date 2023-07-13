import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { thunkCurrentUserBookings, thunkDeleteBooking} from "../../store/booking";


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
            <div>

            <button onClick={handleDelete}>
                Yes (Delete Booking)
            </button>

            <button onClick={closeModal}>
                Cancel (Keep Booking)
            </button>
            </div>
        </div>
    )


}

export default DeleteBooking
