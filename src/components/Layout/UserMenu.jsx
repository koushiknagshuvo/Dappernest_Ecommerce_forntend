import React from "react";
import { NavLink } from "react-router-dom";
import "../../pages/styles/dashbord.css";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <NavLink to="/dashboard/user">
            <h4>User Panel</h4>
          </NavLink>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action">
            Edit Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action">
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
