const GET_ALL_CURR_REVIEWS = "review/loadCurrUserReviews"
const GET_ALL_REVIEWS = "review/allReviews"
const CREATE_REVIEW = "review/createReview"
const EDIT_REVIEW = "review/editReview"
const GET_ONE_REVIEW = "review/getReview"
const DELETE_REVIEW = "review/deleteReview"

const loadCurrUserReviews = (reviews) => ({
    type: GET_ALL_CURR_REVIEWS,
    reviews
})

const loadAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews
    })

const getReview = (review) => ({
    type: GET_ONE_REVIEW,
    review
})

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
})

const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
})

const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review
})

export const thunkCurrUserReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews/currentUser')

    if (response.ok) {
        const data = await response.json()
        dispatch(loadCurrUserReviews(data))

    }
}

export const thunkAllReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews/all')

    if(response.ok) {
        const data = await response.json()
        dispatch(loadAllReviews(data))
    }
}

export const thunkOneReview = (review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/currentUser/${review.id}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getReview(data))
    }
}

export const thunkCreateReview = (review) => async dispatch => {

    const response = await fetch(`/api/taskers/${review.tasker_id}/reviews`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    // we changed body cause we dont need to jsonify
    if (response.ok) {
        const data = await response.json()
        dispatch(createReview(data))
    }
}

export const thunkEditReview = (review) => async dispatch => {
    const response = await fetch(`/api/reviews/edit/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(editReview(data))
    }
}

export const thunkDeleteReview = (review) => async dispatch => {
    const response = await fetch(`/api/reviews/delete/${review.id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteReview(data))
    }
}


const initialState = { currentUserReviews: {}, singleReview: {}, allReviews: {} }
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CURR_REVIEWS: {
            const newState = {}
            const allCurrReviews = action.reviews
            allCurrReviews.forEach(review => {
                newState[review.id] = review
            })
            return {
                ...state, 
                currentUserReviews: newState
            }
        }
        case GET_ALL_REVIEWS: {
            const newState = {}
            const allReviews = action.reviews
            allReviews.forEach(review => {
                newState[review.id] = review
            })
            return {
                ...state,
                allReviews: newState
            }

        }
        case GET_ONE_REVIEW: {
            const newState = {}
            const newReview = action.review
            newState[newReview.id] = newReview
            return {
                ...state, singleReview: newState
            }
        }
        case CREATE_REVIEW: {
            const newState = {}
            const newReview = action.review
            newState[newReview.id] = newReview
            return {
                ...state,
                singleReview: newState,
                allReviews: { ...state.allReviews ,...newState}
            }
        }
        case EDIT_REVIEW: {
            const newState = {}
            const newSingleState = { ...state }
            const newReview = action.review
            newState[newReview.id] = newReview
            return {
                // might not need that new state, that looks odd test otu edit review again later
                currentUserReviews: { ...state.currentUserReviews, ...newState },
                singleReview: newState,
                allReviews: {...state.allReviews}
            }
        }
        case DELETE_REVIEW: {
            const newState = { ...state.currentUserReviews }
            const newSingleState = { ...state.singleReview }
            const reviewId = action.review.reviewId
            delete newState[reviewId]
            delete newSingleState[reviewId]
            return {
                currentUserReviews: newState,
                singleReview: newSingleState,
                allReviews: {...state.allReviews}
            }
        }

        default: return state
    }
   
}
export default reviewsReducer;
