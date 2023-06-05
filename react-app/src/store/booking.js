const GET_ALL_BOOKINGS = 'bookings/getAllBookings'

const getAllBookingsAction = bookings =>({
    type: GET_ALL_BOOKINGS,
    bookings
})


const initialState = { currentUserBookings: {} }

const bookingsReducer = (state = initialState, action )=>{
    switch(action.type){
        case GET_ALL_BOOKINGS:{
            const newState={}
        }
    }
}
