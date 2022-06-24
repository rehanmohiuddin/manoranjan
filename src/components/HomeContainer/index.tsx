import React, { useEffect, useState } from "react";
import "./index.scss";
import Nav from "../SideNav";
import Header from "../Header";
import { useSwipeable } from "react-swipeable";
import { useDispatch, useSelector } from "react-redux";
import { getAllLikedVideosRequest } from "../../actions/likes";
import { getAllWatchLaterVideosRequest } from "../../actions/watchlater";
import { getUserRequest } from "../../actions/auth";
import { getAllHistoryVideosRequest } from "../../actions/history";
import { authState } from "../../types/auth";

interface Props {
  children: React.ReactNode;
}

function Index({ children }: Props) {
  const [showSideNav, setSideNav] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isLoggedIn = false, user } = useSelector(
    (state: { auth: authState }) => state.auth
  );

  useEffect(() => {
    dispatch(getUserRequest());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllLikedVideosRequest());
      dispatch(getAllWatchLaterVideosRequest());
      dispatch(getAllHistoryVideosRequest());
    }
  }, [isLoggedIn]);

  return (
    <div className="root-home-container">
      <Header
        showSideNav={showSideNav}
        setSideNav={() => setSideNav(!showSideNav)}
      />
      <div className="desktop">
        <Nav />
      </div>
      {showSideNav && <Nav />}
      <div className="home-container">
        {children}
        <div className="footer">
          © All Right Reserved <br />
          Powered By
          <a
            href={"https://developers.google.com/youtube/v3/docs"}
            target="_blank"
          >
            Youtube API
          </a>
        </div>
      </div>
    </div>
  );
}

export default Index;
