import React from 'react';
import { NavLink } from 'react-router-dom';

const AccountPage = () => {
    return (
        <>
            <div>
                <NavLink exact to='/reviews'>Your Reviews</NavLink>
            </div>
            <div>
                <NavLink exact to='/:taskerId/bookings/new'>Book a Tasker</NavLink>
            </div>
            <div>
                <NavLink exact to='/billing/new'>Add New Payment</NavLink>
            </div>
            <div>
                <NavLink exact to='/billing'>Your Payments</NavLink>
            </div>
            <div>
                <NavLink exact to='/bookings/all'>Your bookings</NavLink>
            </div>
            
        </>
    )
}

export default AccountPage