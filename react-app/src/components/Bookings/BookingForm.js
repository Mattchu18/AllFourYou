import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { thunkCreateBooking, thunkCurrentUserBookings, thunkEditBooking, thunkOneBooking } from "../../store/booking";
// import thunk from "redux-thunk";
import { thunkAllTasks } from "../../store/task";
import { thunkAllTaskers } from "../../store/taskers";
import { thunkCreateBooking } from "../../store/booking";
import thunk from "redux-thunk";
// import { thunkCreateReview, thunkEditReview  } from "../../store/review";

const BookingForm = ({newBooking, formType}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [category, setCategory] = useState(booking?.category)
    const [city, setCity] = useState(booking?.city)
    const [duration, setDuration] = useState(booking?.duration)
    const [details, setDetails] = useState(booking?.details)
    const [validationErrors, setValidationErrors] = useState("")
    const { taskerId } = useParams()
    const allTasksObj = useSelector(state => state.task.allTasks)
    const allTasks = Object.values(allTasksObj)
    const taskersTask = allTasks.find(task => task.tasker_id === parseInt(taskerId))

    useEffect(() => {
        dispatch(thunkAllTasks())
    }, [dispatch])

    const [category, setCategory] = useState("")
    const [city, setCity] = useState("")
    const [duration, setDuration] = useState("")
    const [details, setDetails] = useState("")
    const [errors, setErrors] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const booking = {
            ...newBooking,
            category,
            city,
            duration,
            details

        }
        if (formType==="Create Booking") {
            dispatch(thunkCreateBooking(booking))
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                {formType === "Edit Booking" ? (<h2>Edit your Booking</h2>) : null}
                {formType === "Create Booking" ? (
                    <div>
                        <h3>
                            Select a Category
                        </h3>
                        {validationErrors.category ? (<p>{validationErrors.category}</p>) : null}
                        {}
                        <select onChange={e => setCategory(e.target.value)}>
                            <option value="">--Please choose a category--</option>
                            <option disabled={taskersTask?.category !== 'Breeding'} value="Breeding">
                                Breeding
                            </option>
                            <option disabled={taskersTask?.category !== 'Matchmaking'} value="Matchmaking">
                                Matchmaking
                            </option>
                            <option disabled={taskersTask?.category !== 'Cooking'} value="Cooking">
                                Cooking
                            </option>
                            <option disabled={taskersTask?.category !== 'Dancing'}value="Dancing">
                                Dancing
                            </option>

                <select>
                    <option value="Breeding">
                        Breeding
                    </option>
                    <option value="Matchmaking">
                        Matchmaking
                    </option>
                    <option value="Cooking">
                        Cooking
                    </option>
                    <option value="Dancing">
                        Dancing
                    </option>

                </select>
                <select>
                    <option value="San Francisco">
                        San Francisco
                    </option>
                    <option disabled={taskersTask.city !== 'Los Angeles'} value="Los Angeles">
                        Los Angeles
                    </option>

                    <option disabled={taskersTask.city !== 'Miami'} value="Miami">
                        Miami

                    </option>

                    <option disabled={taskersTask.city !== 'Toronto'} value="Toronto">
                        Toronto

                    </option>
                    <option disabled={taskersTask.city !== 'Joshua Tree'} value="Joshua Tree">
                        Joshua Tree

                    </option>
                </select>
                <input
                    type="radio"
                    value="short"
                    name="duration"
                />
                <label>
                    Short - Est. 1hr
                </label>
                <input
                    type="radio"
                    value="short"
                    name="duration"
                />
                <label>
                    Medium - Est. 2-3 hrs
                </label>
                <input
                    type="radio"
                    value="short"
                    name="duration"

                />
                <label>
                    Long - Est. 4+ hrs
                </label>
                <textarea
                    type="text"
                    placeholder="Please leave a review"
            
                />

                <button type="submit">Submit</button>
            </form>

        </>
    )
}
export default BookingForm
