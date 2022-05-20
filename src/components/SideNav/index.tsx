import React from "react";
import "./index.scss";
import Logo from "../../assets/sjicon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPencil,
  faRankingStar,
  faSignOut,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  const navRoutes = [
    { route: "/", icon: faHome },
    { route: "/videos", icon: faPencil },
    { route: "/palylist", icon: faRankingStar },
  ];
  return (
    <nav>
      <button>{"R".charAt(0)}</button>
      <div className="nav-icons">
        {navRoutes.map(({ route, icon }) => (
          <Link to={route}>
            <FontAwesomeIcon className="nav-icon" icon={icon} size="2x" />
          </Link>
        ))}
        <FontAwesomeIcon className="nav-icon" icon={faSignOut} />
      </div>
      <div className="filler"></div>
      <img src={Logo} />
    </nav>
  );
}

export default Index;
