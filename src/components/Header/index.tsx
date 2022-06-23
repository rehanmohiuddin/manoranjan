import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { getCategoriesRequest, searchVideosRequest } from "../../actions/video";
import { authState } from "../../types/auth";
import Search from "./Search";

function Header({
  showSideNav = false,
  setSideNav,
}: {
  showSideNav?: boolean;
  setSideNav?: any;
}) {
  const [showMobNav, setMobNav] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories = [], videos } = useSelector(
    (state: { video: videoState }) => state.video
  );
  const [params] = useSearchParams();
  const activeCat = params.get("category") ?? "";

  const { isLoggedIn = false, user } = useSelector(
    (state: { auth: authState }) => state.auth
  );
  const { firstName = "", lastName = "", email = "" } = user ?? {};

  useEffect(() => {
    dispatch(getCategoriesRequest({ chart: "mostPopular" }));
  }, []);

  const handleSearch = (query: string) => {
    // dispatch(searchVideosRequest({ q: query }));
    navigate(`/videos?q=${query}`);
  };

  const renderHeaderBody = () => (
    <>
      <Search search={handleSearch} />
      <div className="avatar-icon">
        {!isLoggedIn ? (
          <Button
            type={BUTTON.LINK}
            linkTo="/login"
            title="Login"
            style={BUTTON.OUTLINE}
          />
        ) : (
          <>
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
            <div className="profile">
              <div>
                {firstName} {lastName}
              </div>
              <div>{email}</div>
            </div>
          </>
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
          onClick={() => setSideNav(!setSideNav)}
          icon={faBars}
          size="2x"
        />
        <div className="desktop">{renderHeaderBody()}</div>
      </div>
      {showMobNav && (
        <div className="mobNav-container">{renderHeaderBody()}</div>
      )}
      <Category categories={categories} activeCategory={activeCat} />
    </header>
  );
}

export default Header;
