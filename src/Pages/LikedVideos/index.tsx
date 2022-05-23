import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeContainer from "../../components/HomeContainer";
import { likeVideosState, videoState } from "../../types/videos";
import VideoList from "../../components/VideoList";
import "../Home/index.scss";
import {
  getAllLikedVideosRequest,
  removeAllLikedVideosRequest,
} from "../../actions/likes";
import { BUTTON } from "../../util/constants";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Index() {
  const dispatch = useDispatch();
  const { likedVideos = [] } = useSelector(
    (state: { likes: likeVideosState }) => state.likes
  );

  useEffect(() => {
    dispatch(getAllLikedVideosRequest());
  }, []);

  const removeAllLikedVideosHandler = () => {
    dispatch(removeAllLikedVideosRequest());
  };

  return (
    <HomeContainer>
      <div className="delete-container">
        <Button
          callBack={removeAllLikedVideosHandler}
          type={BUTTON.BUTTON}
          style={BUTTON.OUTLINE}
        >
          <div className="delete-btn">
            <FontAwesomeIcon icon={faTrash} />
            Remove All
          </div>
        </Button>
      </div>
      <VideoList title="All Videos" items={likedVideos} />
    </HomeContainer>
  );
}

export default Index;
