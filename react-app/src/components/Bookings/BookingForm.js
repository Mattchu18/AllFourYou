import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { thunkCreateBooking, thunkCurrentUserBookings, thunkEditBooking, thunkOneBooking } from "../../store/booking";
// import thunk from "redux-thunk";
import { thunkAllTasks } from "../../store/task";
import { thunkAllTaskers, thunkSingleTasker } from "../../store/taskers";
import './BookingForm.css'
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
    const taskerObj = useSelector(state => state.tasker.singleTasker)
    const tasker = Object.values(taskerObj)


    useEffect(() => {
        dispatch(thunkAllTasks())
        dispatch(thunkSingleTasker(taskerId))
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
        <div className="body-container">

            <div id="booking-form" className="booking-form border">
                <form onSubmit={handleSubmit}>
                    {formType === "Edit Booking" ?
                        (<div>
                            <h2>Edit your Booking for {booking.category} in {booking.city}</h2>
                        </div>
                        ) : (<h2>Create your Booking with {tasker[0]?.first_name}</h2>)}

                    {formType === "Create Booking" ? (
                        <div id="category" className="border">
                            <div className="heading-error">
                                <h3>
                                    What category did you want {tasker[0]?.first_name} to help out with?
                                </h3>
                                {validationErrors.category ? (<p className="errors" >{validationErrors.category}</p>) : null}
                            </div>

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
                                <option disabled={taskersTask?.category !== 'Dancing'} value="Dancing">
                                    Dancing
                                </option>

                            </select>
                        </div>)
                        :
                        null
                    }

                    {formType === "Create Booking" ? (
                        <div id="city" className="border">
                            <div className="heading-error">
                                <h3>
                                    Which city are you located?
                                </h3>
                                {validationErrors.city ? (<p className="errors">{validationErrors.city}</p>) : null}
                            </div>
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
                        null
                    }

                    <div id="duration" className="border">
                        <div className="heading-error">
                            <h3>
                                How long is your task?
                            </h3>
                            {validationErrors.duration ? (<p className="errors">{validationErrors.duration}</p>) : null}
                        </div>
                        <div className="radio duration-container">
                            <label>
                                <input
                                    type="radio"
                                    value="short"
                                    name="duration"
                                    checked={duration === "short"}
                                    onChange={e => setDuration(e.target.value)}
                                />
                                Short - Est. 1hr
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="medium"
                                    name="duration"
                                    checked={duration === "medium"}
                                    onChange={e => setDuration(e.target.value)}

                                />
                                Medium - Est. 2-3 hrs
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="long"
                                    name="duration"
                                    checked={duration === "long"}
                                    onChange={e => setDuration(e.target.value)}

                                />

                                Long - Est. 4+ hrs
                            </label>
                        </div>
                    </div>

                    <div id="details" className="border">
                        <div className="heading-text">
                            <div className="heading-error">
                                <h3>
                                    Tell us the details of your task
                                </h3>
                                {validationErrors.details ? (<p className="errors">{validationErrors.details}</p>) : null}
                            </div>
                            Start the conversation and tell {tasker[0]?.first_name} what you need done. This helps your Tasker what to expect when preparing for your appointment. Don't worry, you can always edit your booking later!
                        </div>
                        <div className="border">

                            <textarea
                                type="text"
                                placeholder="Please write something about your task!"
                                value={details}
                                onChange={e => setDetails(e.target.value)}

                            />
                        </div>
                    </div>
                    <div className="center">
                        <button type="submit" disabled={!(category || city || duration || details)}>Submit</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default BookingForm
