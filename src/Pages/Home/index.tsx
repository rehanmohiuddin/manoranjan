import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest, getVideosRequest } from "../../actions/video";
import HomeContainer from "../../components/HomeContainer";
import { videoState } from "../../types/videos";
import VideoList from "../../components/VideoList";
import "./index.scss";
import { getAllPlaylists } from "../../actions/playlist";
import { getAllLikedVideosRequest } from "../../actions/likes";
import { getAllWatchLaterVideosRequest } from "../../actions/watchlater";

function Index() {
  const dispatch = useDispatch();
  const { categories = [], videos = { items: [] } } = useSelector(
    (state: { video: videoState }) => state.video
  );

  useEffect(() => {
    dispatch(
      getVideosRequest({
        chart: "mostPopular",
        maxResults: 10,
        videoCategoryId: "10",
      })
    );
    dispatch(getAllLikedVideosRequest());
    dispatch(getAllWatchLaterVideosRequest());
  }, []);

  return (
    <HomeContainer>
      {/* <Carousel items={videos.items} /> */}
      <VideoList title="Trending" items={videos.items} />
    </HomeContainer>
  );
}

export default Index;
