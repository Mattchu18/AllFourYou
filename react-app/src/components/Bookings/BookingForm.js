import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { thunkCreateBooking, thunkCurrentUserBookings, thunkEditBooking, thunkOneBooking } from "../../store/booking";
// import thunk from "redux-thunk";
import { thunkAllTasks } from "../../store/task";
import { thunkAllTaskers } from "../../store/taskers";
// import { thunkCreateReview, thunkEditReview  } from "../../store/review";

const BookingForm = ({ booking, formType }) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        let errors = {}
        if (!category) errors.category = "Category is required"
        if (!city) errors.city = "City is required"
        if (!duration) errors.duration = "Duration is required"
        if (!details) errors.details = "Details are required"
        setValidationErrors(errors)

        if (!!Object.keys(errors).length) return

        booking = {
            ...booking,
            category,
            city,
            duration,
            details

        }
        if (formType === "Create Booking") {
            dispatch(thunkCreateBooking(booking))
            dispatch(thunkCurrentUserBookings())
            history.push(`/bookings/all`)
        }

        if (formType === "Edit Booking") {
            console.log("AM I IN HERE =====>", booking)
            dispatch(thunkEditBooking(booking))
            dispatch(thunkCurrentUserBookings())
            history.push(`/bookings/all`)
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

                        </select>
                    </div>)
                    :
                    (<h3>{booking.category}</h3>
                    )}

                {formType === "Create Booking" ? (
                <div>
                    <h3>
                        Select a city
                    </h3>
                        {validationErrors.city ? (<p>{validationErrors.city}</p>) : null}
                <select onChange={e => setCity(e.target.value)}>
                    <option value="">--Please choose a city--</option>
                    <option value="San Francisco">
                        San Francisco
                    </option>
                    <option disabled={taskersTask?.city !== 'Los Angeles'} value="Los Angeles">
                        Los Angeles
                    </option>

                    <option disabled={taskersTask?.city !== 'Miami'} value="Miami">
                        Miami

                    </option>

                    <option disabled={taskersTask?.city !== 'Toronto'} value="Toronto">
                        Toronto

                    </option>
                    <option disabled={taskersTask?.city !== 'Joshua Tree'} value="Joshua Tree">
                        Joshua Tree

                    </option>
                </select>
                  </div>)
                  :
                  (<h3>{booking.city}</h3>)}

                <div>
                    <h3>
                        Select a Duration
                    </h3>
                    {validationErrors.duration ? (<p>{validationErrors.duration}</p>) : null}
                    <input
                        type="radio"
                        value="short"
                        name="duration"
                        checked={duration === "short"}
                        onChange={e => setDuration(e.target.value)}
                    />
                    <label>
                        Short - Est. 1hr
                    </label>
                    <input
                        type="radio"
                        value="medium"
                        name="duration"
                        checked={duration === "medium"}
                        onChange={e => setDuration(e.target.value)}

                    />
                    <label>
                        Medium - Est. 2-3 hrs
                    </label>
                    <input
                        type="radio"
                        value="long"
                        name="duration"
                        checked={duration === "long"}
                        onChange={e => setDuration(e.target.value)}

                    />
                    <label>
                        Long - Est. 4+ hrs
                    </label>
                </div>

                <div>
                    <h3>
                        Task Details
                    </h3>
                    {validationErrors.details ? (<p>{validationErrors.details}</p>) : null}

                    <textarea
                        type="text"
                        placeholder="Please write something about your task!"
                        value={details}
                        onChange={e => setDetails(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={!(category || city || duration || details)}>Submit</button>
            </form>

        </>
    )
}
export default BookingForm
