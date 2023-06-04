// import { csrfFetch } from "./csrf";
const GET_ALL_REVIEWS="review/loadCurrUserReviews"
const CREATE_REVIEW = "review/createReview"
const EDIT_REVIEW = "review/editReview"

const loadCurrUserReviews=(reviews) =>({
    type: GET_ALL_REVIEWS,
    reviews
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
})

export const thunkCurrUserReviews=()=> async(dispatch)=>{
    const response = await fetch('/api/reviews/currentUser')
    console.log("RESPONSE IN THUNK=====>", response)

    if(response.ok){
        const data = await response.json()
        dispatch(loadCurrUserReviews(data))

    }
}

export const thunkCreateReview = (tasker, review) => async dispatch => {
    
    const response = await fetch(`/api/taskers/${tasker.id}/reviews`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createReview(data))
    }
}

export const thunkEditReview = (review) => async dispatch => {
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json()
         dispatch(editReview(data))
    }
}


const initialState = { currentUserReviews:{}}
const reviewsReducer = (state = initialState, action)=>{
    let newState;

    switch(action.type){
        case GET_ALL_REVIEWS:
            newState={...state, currentUserReviews: {}}
            action.reviews.forEach(review=>{
                newState.currentUserReviews[review.id]=review
            })
            console.log("THIS IS after ITERATING=======>", newState)
            return newState

        default: return state
    }
}
export default reviewsReducer;
