const GET_ALL_BOOKINGS = 'bookings/getAllBookings'
const CREATE_BOOKING = "bookings/createABooking"

const createBooking = booking =>({
    type:CREATE_BOOKING,
    booking
})

const getAllBookingsAction = bookings =>({
    type: GET_ALL_BOOKINGS,
    bookings
})

export const thunkCreateBooking = (booking) => async dispatch =>{
    const response = await fetch('/api/bookings/new', {
        "method": "POST",
        "headers": { 'Content-Type': 'application/json'},
        "body": JSON.stringify(
          booking
        )
    })
    if (response.ok){
        const data = await response.json()
        dispatch(createBooking(data))
    }

}

export const thunkCurrentUserBookings = ()=> async dispatch =>{
    const response = await fetch('/api/bookings/all')
    if(response.ok){
        const data = await response.json()
        dispatch(getAllBookingsAction(data))
    }
}

const initialState = { currentUserBookings: {} }
const bookingReducer = (state = initialState, action )=>{
    switch(action.type){
        case GET_ALL_BOOKINGS:{
            const newState={}
            const allBookings = action.bookings
            allBookings.forEach(booking=>{
                newState[booking.id]=booking
            })
            return {
                ...state, currentUserBookings: newState
        }
        }
        default: return state
    }
}

export default bookingReducer
