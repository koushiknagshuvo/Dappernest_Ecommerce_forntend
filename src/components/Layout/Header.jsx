import { Badge } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import useCategory from "../../hooks/useCategoty";
import "../../pages/styles/header.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container nav_container ">
          <Link to="/" className="navbar-brand">
            <img
              className="img-fluid"
              src="./images/logo.png"
              alt="Dappernest"
            />
          </Link>
          <button
            className="bx bx-menu-alt-right"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"></button>

          <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-xl-auto nav_ul ">
              <li className="nav-item d-flex align-items-center Category_item_link_List">
                {categories?.map(c => (
                  <li className="d-flex ">
                    <Link
                      className=" Category_item_link "
                      to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </li>

              <Link className="All_Categories" to={"/categories"}>
                <i className="bx bx-menu"></i>
                All Categories
              </Link>
            </ul>
          </div>

          <div className="profile">
            {!auth?.user ? (
              <>
                <div className="dropdown">
                  <button
                    className="user_profile"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bx bx-user"></i>
                    <span>Account</span>
                    <i class="bx bx-chevron-down"></i>
                  </button>
                  <ul className="dropdown-menu" id="dropdown-menu">
                    <li className="nav-item text-center">
                      <NavLink to="/register" className="nav-link">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item text-center">
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="dropdown ">
                  <button
                    className="user_profile"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bx bx-user"></i>
                    <span> {auth?.user?.name}</span>
                    <i class="bx bx-chevron-down"></i>
                  </button>
                  <ul className="dropdown-menu ">
                    <li className=" text-center">
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="nav-link">
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="text-center">
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className=" nav-link">
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
          <div>
            <NavLink to="/cart" className="navbar_cart ">
              <Badge count={cart?.length} showZero offset={[10, -5]}>
                <i class="bx bx-cart-alt cart_incon_navbar"></i>
              </Badge>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
