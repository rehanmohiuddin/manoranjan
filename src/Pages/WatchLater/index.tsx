import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeContainer from "../../components/HomeContainer";
import VideoList from "../../components/VideoList";
import "../Home/index.scss";
import { BUTTON } from "../../util/constants";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { watchLaterState } from "../../types/watchlater";
import {
  getAllWatchLaterVideosRequest,
  removeAllWatchLaterVideosRequest,
} from "../../actions/watchlater";

function Index() {
  const dispatch = useDispatch();
  const { watchlaterVideos = [] } = useSelector(
    (state: { watchlater: watchLaterState }) => state.watchlater
  );

  useEffect(() => {
    dispatch(getAllWatchLaterVideosRequest());
  }, []);

  const removeAllWatchLaterVideosHandler = () => {
    dispatch(removeAllWatchLaterVideosRequest());
  };

  return (
    <HomeContainer>
      <div className="delete-container">
        <Button
          callBack={removeAllWatchLaterVideosHandler}
          type={BUTTON.BUTTON}
          style={BUTTON.OUTLINE}
        >
          <div className="delete-btn">
            <FontAwesomeIcon icon={faTrash} />
            Remove All
          </div>
        </Button>
      </div>
      <VideoList title="Watch Later Videos" items={watchlaterVideos} />
    </HomeContainer>
  );
}

export default Index;
