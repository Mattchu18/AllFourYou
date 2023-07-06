const GET_ALL_TASKERS = "tasker/loadAllTaskers"
const GET_SINGLE_TASKER = "tasker/loadSingleTasker"



const loadAllTaskers = (taskers) => ({
    type: GET_ALL_TASKERS,
    taskers
})

const loadSingleTasker = (tasker) => ({
    type: GET_SINGLE_TASKER,
    tasker
})

export const thunkAllTaskers = () => async (dispatch) => {
    const response = await fetch('/api/taskers/all')
    if (response.ok) {
        const data = await response.json()
        dispatch(loadAllTaskers(data))
    }
}

export const thunkSingleTasker = (tasker) => async (dispatch) => {
    const response = await fetch(`/api/taskers/${tasker}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadSingleTasker(data))
    }
}

const initialState = { 
    allTaskers: {},
    singleTasker: {}
}

const taskersReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_TASKERS: {
            const newState = {}
            const allTaskers = action.taskers
            allTaskers.forEach(tasker => {
                newState[tasker.id] = tasker
            })
            return {
                ...state,
                allTaskers: newState
            }
        }
        case GET_SINGLE_TASKER: {
            const newState = {}
            const tasker = action.tasker
            newState[tasker.id] = tasker
            return {
                ...state,
                singleTasker: newState
            }
        }

        default: return state
    }
}

export default taskersReducer