import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="nav-bar-container">

						<div className="logo-home">

				<NavLink className="nav-links-on-navbar" exact to="/">taskDoctor</NavLink>

						</div>

				<div>

				</div>
				<div className="other-nav-links">
			{ sessionUser ?



			<>

				<NavLink className="nav-links-on-navbar" exact to ='/account'>Account</NavLink>


                <NavLink className="nav-links-on-navbar" exact to='/available'>Look for a Tasker to Book</NavLink>

			</>

			: null
			}
			{isLoaded && (

					<ProfileButton user={sessionUser} />

			)}
			</div>

		</div>

	);
}

export default Navigation;
