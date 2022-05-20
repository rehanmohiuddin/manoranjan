import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest, getVideosRequest } from "../../actions/video";
import HomeContainer from "../../components/HomeContainer";
import { videoState } from "../../types/videos";
import Carousel from "../../components/Carousel";
import Category from "../../components/Category";
import VideoList from "../../components/VideoList";
import "./index.scss";

function Index() {
  const dispatch = useDispatch();
  const { categories = [], videos = { items: [] } } = useSelector(
    (state: { video: videoState }) => state.video
  );

  console.log(videos);

  useEffect(() => {
    dispatch(getCategoriesRequest({ chart: "mostPopular" }));
    dispatch(
      getVideosRequest({
        chart: "mostPopular",
        maxResults: 10,
        videoCategoryId: "10",
      })
    );
  }, []);

  return (
    <HomeContainer>
      {/* <Carousel items={videos.items} /> */}
      <VideoList title="Trending" items={videos.items} />
    </HomeContainer>
  );
}

export default Index;
