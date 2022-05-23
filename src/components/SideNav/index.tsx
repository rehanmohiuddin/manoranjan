import React from "react";
import "./index.scss";
import Logo from "../../assets/icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faClock,
  faHeart,
  faHistory,
  faHome,
  faPencil,
  faRankingStar,
  faSignOut,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../actions/auth";
import { authState } from "../../types/auth";

function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn = false } = useSelector(
    (state: { auth: authState }) => state.auth
  );
  const navRoutes = [
    { route: "/", icon: faHome, name: "Home" },
    { route: "/videos", icon: faPencil, name: "Videos" },
    { route: "/playlist", icon: faRankingStar, name: "PlayLists" },
    { route: "/like/videos", icon: faHeart, name: "Liked" },
    { route: "/watchlater", icon: faClock, name: "Watch Later" },
    { route: "/history", icon: faHistory, name: "History" },
  ];

  const logOutHandler = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <nav>
      <button>{"R".charAt(0)}</button>
      <div className="nav-icons">
        {navRoutes.map(({ route, icon, name }) => (
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to={route}
          >
            <FontAwesomeIcon className="nav-icon" icon={icon} size="2x" />
            {name}
          </NavLink>
        ))}
        {isLoggedIn && (
          <div onClick={logOutHandler} className="log-out-btn">
            <FontAwesomeIcon className="nav-icon" icon={faSignOut} />
            Log Out
          </div>
        )}
      </div>
      <FontAwesomeIcon className="close-nav" icon={faArrowCircleLeft} />
      <div className="filler"></div>
      <img src={Logo} />
    </nav>
  );
}

export default Index;
