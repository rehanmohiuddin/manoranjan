import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesRequest,
  getMoreVideosRequest,
  getVideosRequest,
  searchVideosRequest,
} from "../../actions/video";
import HomeContainer from "../../components/HomeContainer";
import { likeVideosState, videoState } from "../../types/videos";
import VideoList from "../../components/VideoList";
import "../Home/index.scss";
import { useSearchParams } from "react-router-dom";

function Index() {
  const dispatch = useDispatch();
  const { categories = [], videos = { items: [], nextPageToken: "" } } =
    useSelector((state: { video: videoState }) => state.video);

  const ref = useRef<HTMLDivElement>(null);
  const [params] = useSearchParams();
  const query: string | null = params.get("q");

  useEffect(() => {
    const request = query
      ? searchVideosRequest({ q: query })
      : getVideosRequest({
          chart: "mostPopular",
          maxResults: 10,
          videoCategoryId: "10",
        });
    dispatch(request);
  }, [query]);

  const intersectionCallback = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && videos.items.length > 0) {
      const moreRequest = getMoreVideosRequest({
        chart: "mostPopular",
        part: "snippet,status,statistics",
        pageToken: videos.nextPageToken,
        maxResults: 20,
      });
      dispatch(moreRequest);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(intersectionCallback, options);
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, videos, query]);

  return (
    <HomeContainer>
      {/* <Carousel items={videos.items} /> */}
      <VideoList title="All Videos" items={videos.items} />
      <div className="next-page" ref={ref}></div>
    </HomeContainer>
  );
}

export default Index;
