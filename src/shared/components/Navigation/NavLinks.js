import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AUTHENTICATION_CONTEXT } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AUTHENTICATION_CONTEXT);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Explore Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Places</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}
      {auth.isLoggedIn && ( <l1>
        <button onClick={auth.logout}>Logout</button>
      </l1>

      )}
    </ul>
  );
};

export default NavLinks;
