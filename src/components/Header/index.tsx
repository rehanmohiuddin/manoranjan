import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import Modal from "../Modal";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faUserCircle,
  faFilter,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { BUTTON } from "../../util/constants";
import Logo from "../../assets/Manoranjan.png";
import Button from "../Button";
import Category from "../../components/Category";
import { useDispatch, useSelector } from "react-redux";
import { videoState } from "../../types/videos";
import { getCategoriesRequest } from "../../actions/video";

function Header() {
  const [showMobNav, setMobNav] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories = [] } = useSelector(
    (state: { video: videoState }) => state.video
  );
  const isLoggedIn = false;

  useEffect(() => {
    dispatch(getCategoriesRequest({ chart: "mostPopular" }));
  }, []);

  const renderHeaderBody = () => (
    <>
      <div className="search-continer">
        <FontAwesomeIcon icon={faSearch} />
        <input placeholder="Search By Name" />
      </div>

      <div className="avatar-icon">
        {!isLoggedIn ? (
          <Button
            type={BUTTON.LINK}
            linkTo="/login"
            title="Login"
            style={BUTTON.OUTLINE}
          />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        )}
      </div>
    </>
  );

  return (
    <header>
      <div className="header-container">
        <Link to={"/"}>
          <img src={Logo} />
        </Link>
        <FontAwesomeIcon
          className="mobNav"
          onClick={() => setMobNav(!showMobNav)}
          icon={faBars}
          size="2x"
        />
        <div className="desktop">{renderHeaderBody()}</div>
      </div>
      {showMobNav && (
        <div className="mobNav-container">{renderHeaderBody()}</div>
      )}
      <Category categories={categories} />
    </header>
  );
}

export default Header;
