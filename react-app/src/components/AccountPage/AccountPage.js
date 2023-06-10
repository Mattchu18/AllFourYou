import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import "./AccountPage.css"

const AccountPage = () => {
    const currUser = useSelector(state => state.session.user)
    console.log("THIS IS CURRENT======>", currUser)


    return (
        <div id="account-body-div">
            <div className="account-heading-content-div">
                <h2>Your Account</h2>
                <div class="account-div">

                    <div className='links-div'>
                        <div>
                            <NavLink exact to='/reviews'>Manage Your Reviews</NavLink>
                        </div>
                        {/* <div>
                <NavLink exact to='/'>Look for a Tasker to Book</NavLink>
            </div> */}
                        {/* <div>
                <NavLink exact to='/billing/new'>Add New Payment</NavLink>
            </div> */}
                        <div>
                            <NavLink exact to='/billing'>Your Payments</NavLink>
                        </div>
                        <div>
                            <NavLink exact to='/bookings/all'>Your bookings</NavLink>
                        </div>
                    </div>
                    <div className='user-info-div'>
                        <div className='currUser-name'>
                        <i class="fa-solid fa-user"></i>
                            <span>{currUser.first_name}, {currUser.last_name}</span>
                        </div>
                        <div className='currUser-email'>
                            <i class="fa-solid fa-envelope"></i>
                            <span>{currUser.email}</span>
                        </div>
                        <div className='currUser-phone'>
                            <i class="fa-solid fa-phone"></i>
                            <span>{currUser.phone_number}</span>
                        </div>
                        <div className='currUser-city'>
                            <i class="fa-sharp fa-solid fa-location-dot"></i>
                            <span>{currUser.city}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AccountPage
