import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkAllTaskers } from "../../store/taskers";

const GetAllTaskers = () => {
    const dispatch = useDispatch()
    const allTaskers = useSelector(state => state.tasker.allTaskers)
    
    useEffect(() => {
        dispatch(thunkAllTaskers())
    }, [dispatch])

    if(!allTaskers) return "loading.."

    return (
        <>
            <ul>
                {Object.values(allTaskers).map(tasker => {
                    return (
                        <>
                        <div>
                        {tasker.available}
                        </div>
                        <div>
                        {tasker.bio}
                        </div>
                        <div>
                        {tasker.city}
                        </div>
                        <div>
                        {tasker.email}
                        </div>
                        <div>
                        {tasker.first_name}
                        </div>
                        <div>
                        {tasker.last_name}
                        </div>
                        <div>
                        {tasker.phone_number}
                        </div>
                        <div>
                        {tasker.profile_image}
                        </div>
                        <div>
                        {tasker.tools}
                        </div>
                        <div>
                        {tasker.vehicles}
                        </div>
                        <br></br>
                        </>
                    )
                })}
            </ul>
        </>
    )
}

export default GetAllTaskers