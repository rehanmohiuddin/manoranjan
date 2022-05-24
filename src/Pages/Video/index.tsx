import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import YouTube from "react-youtube";
import HomeContainer from "../../components/HomeContainer";
import "./index.scss";
import VideoList from "../../components/VideoList";
import { useDispatch, useSelector } from "react-redux";
import { videoState } from "../../types/videos";
import {
  getChannelRequest,
  getVideoRequest,
  getVideosRequest,
} from "../../actions/video";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPlayCircle,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { addToHistoryVideosRequest } from "../../actions/history";

function Index() {
  const [params] = useSearchParams();
  const {
    suggestions = { items: [] },
    allVideos = {},
    allChannels = {},
  } = useSelector((state: { video: videoState }) => state.video);
  const videoId = params.get("v") ?? "";
  const {
    snippet = { title: "", description: "", channelId: "", channelTitle: "" },
  } = allVideos[videoId] ?? {};
  const dispatch = useDispatch();
  const opts = {
    height: "500",
    width: "900",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const video = {
    getVideos: function () {
      dispatch(
        getVideosRequest({
          id: videoId,
        })
      );
      return this;
    },
    getChannel: function () {
      dispatch(
        getChannelRequest({
          id: snippet.channelId,
          part: "snippet",
        })
      );
      return this;
    },
    getSuggestions: function () {
      dispatch(
        getVideoRequest({
          part: "snippet",
          relatedToVideoId: videoId,
          type: "video",
          maxResults: 50,
        })
      );
      return this;
    },
  };

  const addToHistoryHandler = () => {
    dispatch(addToHistoryVideosRequest({ video: allVideos[videoId] }));
  };

  useEffect(() => {
    videoId && video.getVideos().getChannel().getSuggestions();
  }, [videoId]);

  return (
    <HomeContainer>
      <div className="video-container">
        <div className="video-left">
          <YouTube
            className="video"
            videoId={videoId}
            opts={opts}
            onPlay={addToHistoryHandler}
          />
          <div className="title">{snippet.title}</div>
          <div className="video-actions">
            <div className="published-at">
              {new Date(
                allVideos[videoId]?.snippet.publishedAt
              ).toLocaleString()}
            </div>
            <div className="actions">
              <div>
                <FontAwesomeIcon icon={faThumbsUp} />
                Like
              </div>
              <div>
                <FontAwesomeIcon icon={faThumbsDown} />
                DisLike
              </div>
              <div>
                <FontAwesomeIcon icon={faPlayCircle} />
                Add To Playlist
              </div>
              <div>
                <FontAwesomeIcon icon={faClock} />
                Watch Later
              </div>
            </div>
          </div>
          {allVideos[videoId] && (
            <div className="channel">
              <img
                alt="channel"
                src={
                  allChannels[snippet.channelId]?.snippet.thumbnails.default.url
                }
              />
              <div className="title">
                {allChannels[snippet.channelId]?.snippet.title}
              </div>
            </div>
          )}
          <div className="video-description">{snippet.description}</div>
        </div>
        <div className="video-right">
          {/* <VideoList title="Suggested" items={videos.items} /> */}
          <div className="video-list-container">
            <div className="video-list-title">Trending</div>
            <div className="video-list">
              {suggestions.items.map((video) => (
                <>
                  {video.snippet && (
                    <Link to={`/watch?v=${video.id.videoId}`} className="video">
                      <img
                        src={video.snippet.thumbnails.high.url}
                        className="video-thumbnail"
                      />
                      <div className="video-body">
                        <div className="video-title">{video.snippet.title}</div>
                        <div className="video-bottom">
                          <div className="video-channel">
                            {video.snippet.channelTitle}
                          </div>
                        </div>
                        <FontAwesomeIcon
                          className="watch-later"
                          icon={faClock}
                        />
                      </div>
                    </Link>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HomeContainer>
  );
}

export default Index;
