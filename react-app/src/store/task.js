const GET_ALL_TASKS = "tasks/getAllTasks"

const getAllTasksAction = tasks => ({
    type: GET_ALL_TASKS,
    tasks
})


export const thunkAllTasks = () => async dispatch => {
    const response = await fetch("/api/tasks/all")
    if (response.ok) {
        const data = await response.json()
        dispatch(getAllTasksAction(data))
    }
}


const initialState = { allTasks: {}, singleTask: {} }
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TASKS: {
            const newState = {}
            const allTasks = action.tasks
            allTasks.forEach( task => {
                newState[task.id] = task
            })
            return {
                ...state, allTasks: newState
            }
        }
        default:
            return state
    }

}


export default taskReducer
