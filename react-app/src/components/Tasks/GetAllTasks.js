import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkAllTasks } from "../../store/task";

const GetAllTasks = () => {
    const dispatch = useDispatch()
    const tasksObj = useSelector(state => state.task.allTasks)
    const tasksArr = Object.values(tasksObj)
    console.log(tasksObj)

    useEffect(() => {
        dispatch(thunkAllTasks())

    }, [dispatch])


    return (
        <>
            {tasksArr.map(task => (
                <>
                    <div>
                        id: {task.id}
                    </div>
                    <div>
                        category: {task.category}
                    </div>
                    <div>
                        description: {task.description}
                    </div>
                    <div>
                        tasker_id: {task.tasker_id}
                    </div>
                    <div>
                        available:{task.available}
                    </div>
                    <br />

                </>
            ))}
        </>
    )
}

export default GetAllTasks
