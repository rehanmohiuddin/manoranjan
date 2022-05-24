import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeContainer from "../../components/HomeContainer";
import VideoList from "../../components/VideoList";
import "../Home/index.scss";
import { BUTTON, FROM } from "../../util/constants";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  getAllHistoryVideosRequest,
  removeAllHistoryVideosRequest,
} from "../../actions/history";
import { historyState } from "../../types/history";

function Index() {
  const dispatch = useDispatch();
  const { historyVideos = [] } = useSelector(
    (state: { history: historyState }) => state.history
  );

  useEffect(() => {
    dispatch(getAllHistoryVideosRequest());
  }, []);

  const removeAllHistoryVideosHandler = () => {
    dispatch(removeAllHistoryVideosRequest());
  };

  return (
    <HomeContainer>
      <div className="delete-container">
        <Button
          callBack={removeAllHistoryVideosHandler}
          type={BUTTON.BUTTON}
          style={BUTTON.OUTLINE}
        >
          <div className="delete-btn">
            <FontAwesomeIcon icon={faTrash} />
            Clear All
          </div>
        </Button>
      </div>
      <VideoList
        from={FROM.HISTORY}
        title="PreviousLy Watched Videos"
        items={historyVideos}
      />
    </HomeContainer>
  );
}

export default Index;
