import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkAllTaskers } from "../../store/taskers";
import { NavLink } from "react-router-dom";
import './GetAllTaskers.css'
const GetAllTaskers = () => {
    const dispatch = useDispatch()
    const allTaskers = useSelector(state => state.tasker.allTaskers)

    useEffect(() => {
        dispatch(thunkAllTaskers())
    }, [dispatch])

    if(!allTaskers) return "loading.."

    return (
        <>
        <div className="available-tasker-div">

        <h2 className="our-available-taskers">Available Taskers</h2>
        </div>
        <div className="outer-available">

                {Object.values(allTaskers).map(tasker => {
                    return (

                        <>
                        {tasker.available ?
                        <div className="available-tasker-card">
                        <NavLink className="available-links" exact to={`taskers/${tasker.id}`}>



                        <div className="image-card">
                            <img className="imag" src={tasker.profile_image}/>

                        </div>

                    <div className="available-tasker-info">

                        <div className="available-first-last-name">
                        <h3>{tasker.first_name} {tasker.last_name}</h3>
                        </div>

                    <div className="availables available-bio">
                                            {tasker.bio.slice(0,125)}...
                                            </div>
                        <div className="availables available-city">
                       <i className="fas fa-city availablesss">   {tasker.city}</i>
                        </div>

                        <div className="availables available-email">
                       <i className="fab fa-telegram-plane"> {tasker.email}</i>
                        </div>
                        {/* <div className="availables available-phone">
                        {tasker.phone_number}
                        </div> */}
                        <div className="availables available-tools">
                        <i className="fas fa-wrench"> {tasker.tools}</i>
                        </div>
                        <div className="availables available-vehicle">
                        <i className="fas fa-truck"> {tasker.vehicles}</i>
                        </div>
                        <h3 className="available-view-profile" >View Tasker Profile</h3>

                    </div>
                        <br></br>
                        </NavLink></div>
                      : null
                        }
                        </>

                    )
                })}
           </div>
        </>
    )
}

export default GetAllTaskers
