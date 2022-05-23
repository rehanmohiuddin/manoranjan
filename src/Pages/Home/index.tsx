import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest, getVideosRequest } from "../../actions/video";
import HomeContainer from "../../components/HomeContainer";
import { videoState } from "../../types/videos";
import VideoList from "../../components/VideoList";
import "./index.scss";
import Button from "../../components/Button";
import { getAllLikedVideosRequest } from "../../actions/likes";
import { getAllWatchLaterVideosRequest } from "../../actions/watchlater";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BUTTON } from "../../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Index() {
  const dispatch = useDispatch();
  const { allCategories = {}, videos = { items: [] } } = useSelector(
    (state: { video: videoState }) => state.video
  );
  const [params] = useSearchParams();
  const category = params.get("category") ?? null;
  const [header, setHeader] = useState<string>("Trending");
  const navigate = useNavigate();

  useEffect(() => {
    const query = category
      ? {
          chart: "mostPopular",
          maxResults: 10,
          videoCategoryId: category,
        }
      : { chart: "mostPopular", maxResults: 10 };

    dispatch(getVideosRequest(query));
    dispatch(getAllLikedVideosRequest());
    dispatch(getAllWatchLaterVideosRequest());
  }, [category]);

  useEffect(() => {
    category && setHeader(allCategories[category].snippet.title);
  }, [category]);

  const removeAllFiltersHandler = () => {
    navigate("/");
    setHeader("Trending");
  };

  return (
    <HomeContainer>
      {category && (
        <div className="delete-container clear-all">
          <Button
            callBack={removeAllFiltersHandler}
            type={BUTTON.BUTTON}
            style={BUTTON.OUTLINE}
          >
            <div className="delete-btn">
              <FontAwesomeIcon icon={faTrash} />
              Remove All Filter
            </div>
          </Button>
        </div>
      )}
      <VideoList title={header} items={videos.items} />
    </HomeContainer>
  );
}

export default Index;
