import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkAllTaskers } from "../../store/taskers";
import { NavLink } from "react-router-dom";

const GetAllTaskers = () => {
    const dispatch = useDispatch()
    const allTaskers = useSelector(state => state.tasker.allTaskers)
    
    useEffect(() => {
        dispatch(thunkAllTaskers())
    }, [dispatch])

    if(!allTaskers) return "loading.."

    return (
        <>
        <h1>Our Available Taskers!</h1>
            <ul>
                {Object.values(allTaskers).map(tasker => {
                    return (
                        <>
                        {tasker.available ? 
                        <NavLink exact to={`taskers/${tasker.id}`}>
                        <div>
                        {tasker.profile_image}
                        </div>
                        <div>
                        {tasker.first_name}
                        {tasker.last_name}
                        </div>
                        <div>
                        {tasker.city}
                        </div>
                        <div>
                        {tasker.bio}
                        </div>
                        <div>
                        {tasker.email}
                        </div>
                        <div>
                        {tasker.phone_number}
                        </div>
                        <div>
                        {tasker.tools}
                        </div>
                        <div>
                        {tasker.vehicles}
                        </div>
                        <br></br>
                        </NavLink>
                        : null
                        }
                        </>
                    )
                })}
            </ul>
        </>
    )
}

export default GetAllTaskers