import React from 'react'
import { Link } from 'react-router-dom'
import NavLink from './NavLink';
import { useSelector } from 'react-redux';
export const NavBar = () => {
  const loggedIn = useSelector((state) => state.setLog.isLoggedIn);
  if (loggedIn) {

    return (

      <nav className="navbar p-fixed toggled navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <div className="container-fluid d-flex flex-column p-0">
          <Link className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" to={'/'}>
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fa-solid fa-landmark"></i>
            </div>
          </Link>
          <hr className="sidebar-divider my-0" />
          <ul className="navbar-nav text-light" id="accordionSidebar">
            {loggedIn && <>
              <NavLink icon="fa fa-book" path="/schedule" name="Create Schedule" />
              <NavLink icon="fa-solid fa-clock-rotate-left" path="/email-log" name="Sent Mail Log" />
            </>}

          </ul>

        </div>
      </nav>
    )
  }
  else {
    return null
  }
}
