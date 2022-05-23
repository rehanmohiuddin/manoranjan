import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesRequest,
  getMoreVideosRequest,
  getVideosRequest,
} from "../../actions/video";
import HomeContainer from "../../components/HomeContainer";
import { likeVideosState, videoState } from "../../types/videos";
import VideoList from "../../components/VideoList";
import "../Home/index.scss";

function Index() {
  const dispatch = useDispatch();
  const { categories = [], videos = { items: [], nextPageToken: "" } } =
    useSelector((state: { video: videoState }) => state.video);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(
      getVideosRequest({
        chart: "mostPopular",
        maxResults: 10,
        videoCategoryId: "10",
      })
    );
  }, []);

  const intersectionCallback = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && videos.items.length > 0) {
      //   console.log(videos.nextPageToken);
      dispatch(
        getMoreVideosRequest({
          chart: "mostPopular",
          part: "snippet",
          pageToken: videos.nextPageToken,
          maxResults: 20,
        })
      );
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    if (ref.current) {
      const observer = new IntersectionObserver(intersectionCallback, options);
      observer.observe(ref.current);
    }
  }, [ref]);

  return (
    <HomeContainer>
      {/* <Carousel items={videos.items} /> */}
      <VideoList title="All Videos" items={videos.items} />
      <div className="next-page" ref={ref}></div>
    </HomeContainer>
  );
}

export default Index;
