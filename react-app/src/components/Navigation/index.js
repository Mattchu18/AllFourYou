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

				<NavLink className="nav-links-on-navbar panda-logo" exact to="/"><img className="panda-png" src="https://cdn.discordapp.com/attachments/1062942242450460744/1116920295043899504/panda.png"/></NavLink>

						</div>

				<div>

				</div>
				<div className="other-nav-links">
			{ sessionUser ?



			<>
				<NavLink className="nav-links-on-navbar navbargreen" exact to='/available'>Available taskers!</NavLink>
				<NavLink className="nav-links-on-navbar navbargreen" exact to ='/account'>Account</NavLink>
				<NavLink className="nav-links-on-navbar navbargreen" exact to ='/users'>Chat with other Users</NavLink>




			</>

			: null
			}
			{isLoaded && (

					<ProfileButton className="profile-dropdown" user={sessionUser} />

			)}
			</div>

		</div>

	);
}

export default Navigation;
