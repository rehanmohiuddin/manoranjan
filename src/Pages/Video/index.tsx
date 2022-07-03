import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import YouTube from "react-youtube";
import HomeContainer from "../../components/HomeContainer";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { likeVideosState, VideoPayload, videoState } from "../../types/videos";
import {
  getChannelRequest,
  getVideoRequest,
  getVideosRequest,
} from "../../actions/video";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPlayCircle,
  faPlus,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { addToHistoryVideosRequest } from "../../actions/history";
import { watchLaterState } from "../../types/watchlater";
import {
  addToLikeVideosRequest,
  removeFromLikeVideosRequest,
} from "../../actions/likes";
import {
  addToWatchLaterVideosRequest,
  removeFromWatchLaterVideosRequest,
} from "../../actions/watchlater";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { playlistState } from "../../types/playlist";
import { BUTTON } from "../../util/constants";
import { addVideoToPlaylist } from "../../actions/playlist";
import Playlist from "../../components/Playlist";

function Index() {
  const location = useLocation();
  const {
    suggestions = { items: [] },
    allVideos = {},
    allChannels = {},
  } = useSelector((state: { video: videoState }) => state.video);
  const { allLikedVideos = {} } = useSelector(
    (state: { likes: likeVideosState }) => state.likes
  );
  const { allwatchlaterVideos } = useSelector(
    (state: { watchlater: watchLaterState }) => state.watchlater
  );
  const { playlists = [], allPlaylists = {} } = useSelector(
    (state: { playlist: playlistState }) => state.playlist
  );
  const [playlistAction, setPlaylistAction] = useState<{
    _id: string;
    video: any;
    open: boolean;
  }>({ _id: "", video: {}, open: false });

  const videoId = location.pathname.split("/")[2] ?? "";
  const {
    snippet = { title: "", description: "", channelId: "", channelTitle: "" },
  } = allVideos[videoId] ?? {};
  const dispatch = useDispatch();
  const opts = {
    height: "500",
    width: "900",
    playerVars: {
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

  const videoAction = [
    {
      textClass: {
        class: allLikedVideos[videoId] ? "active" : "",
        text: allLikedVideos[videoId] ? "Liked" : "Like",
      },
      action: () =>
        dispatch(
          allLikedVideos[videoId]
            ? removeFromLikeVideosRequest({ video: allVideos[videoId] })
            : addToLikeVideosRequest({ video: allVideos[videoId] })
        ),
      icon: faThumbsUp,
    },
    {
      textClass: {
        class: allwatchlaterVideos[videoId] ? "active" : "",
        text: allwatchlaterVideos[videoId]
          ? "Added To Watch Later"
          : "Watch Later",
      },
      action: () =>
        dispatch(
          allwatchlaterVideos[videoId]
            ? removeFromWatchLaterVideosRequest({ video: allVideos[videoId] })
            : addToWatchLaterVideosRequest({ video: allVideos[videoId] })
        ),
      icon: faClock,
    },
  ];

  const renderVideoOptions = () => (
    <div className="actions">
      {videoAction.map((action) => (
        <div onClick={action.action}>
          <FontAwesomeIcon
            className={action.textClass.class}
            icon={action.icon}
          />
          {action.textClass.text}
        </div>
      ))}
      <Playlist video={allVideos[videoId]} />
    </div>
  );

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
            {renderVideoOptions()}
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
                    <div className="video trending">
                      <Link to={`/watch?v=${video.id.videoId}`}>
                        <img
                          src={video.snippet.thumbnails.high.url}
                          className="video-thumbnail"
                        />
                      </Link>
                      <div className="video-body">
                        <Link to={`/watch?v=${video.id.videoId}`}>
                          <div className="video-title">
                            {video.snippet.title}
                          </div>
                        </Link>
                        <div className="video-bottom">
                          <div className="video-channel">
                            {video.snippet.channelTitle}
                          </div>
                          <div
                            className="icon"
                            onClick={() =>
                              dispatch(
                                addToWatchLaterVideosRequest({ video: video })
                              )
                            }
                          >
                            <FontAwesomeIcon
                              className="watch-later"
                              icon={faClock}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
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
