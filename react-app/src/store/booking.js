const GET_ALL_BOOKINGS = 'bookings/getAllBookings'
const CREATE_BOOKING = "bookings/createABooking"
const EDIT_BOOKING = "bookings/editBooking"
const GET_ONE_BOOKING = "bookings/getOneBooking"
const DELETE_BOOKING = "bookings/deleteBooking"

const getAllBookingsAction = bookings => ({
    type: GET_ALL_BOOKINGS,
    bookings
})

const getBooking = booking => ({
    type: GET_ONE_BOOKING,
    booking
})

const createBooking = booking => ({
    type: CREATE_BOOKING,
    booking
})

const editBooking = booking => ({
    type: EDIT_BOOKING,
    booking
})

const deleteBooking = booking => ({
    type: DELETE_BOOKING,
    booking
})


export const thunkCreateBooking = (booking) => async dispatch => {
    const response = await fetch(`/api/taskers/${booking.tasker_id}/book`, {
        "method": "POST",
        "headers": { 'Content-Type': 'application/json' },
        "body": JSON.stringify(
            booking
        )
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(createBooking(data))
    }

}

export const thunkOneBooking = (bookingId) => async dispatch => {
    const response = await fetch(`/api/bookings/single/${bookingId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getBooking(data))
    }
}

export const thunkCurrentUserBookings = () => async dispatch => {
    const response = await fetch('/api/bookings/all')
    if (response.ok) {
        const data = await response.json()
        dispatch(getAllBookingsAction(data))
    }
}

export const thunkEditBooking = (booking) => async dispatch => {
    const response = await fetch(`/api/bookings/edit/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(editBooking(data))
    }
}

export const thunkDeleteBooking = (bookingId) => async dispatch => {
    const response = await fetch(`/api/bookings/delete/${bookingId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteBooking(bookingId))
    }

}


const initialState = { currentUserBookings: {}, singleBooking: {} }
const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BOOKINGS: {
            const newState = {}
            const allBookings = action.bookings
            allBookings.forEach(booking => {

                newState[booking.id] = booking
            })
            return {
                ...state, currentUserBookings: newState
            }
        }
        case GET_ONE_BOOKING: {
            const newState = {}
            const newBooking = action.booking
            newState[newBooking.id] = newBooking
            return {
                ...state, singleBooking: newState
            }
        }
        case EDIT_BOOKING: {
            const newState = {}
            const newBooking = action.booking
            newState[newBooking.id] = newBooking
            return {
                ...state, singleBooking: newState
            }
        }
        case DELETE_BOOKING: {
            const newState = {
                ...state,
                currentUserBookings: { ...state.currentUserBookings },
                singleBooking: { ...state.singleBooking }
            }
            delete newState.currentUserBookings[action.bookingId]
            delete newState.singleBooking[action.bookingId]
            return newState
        }

        default: return state
    }
}

export default bookingReducer
