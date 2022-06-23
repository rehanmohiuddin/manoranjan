import {
  faCheckCircle,
  faClock,
  faEllipsisVertical,
  faPlayCircle,
  faPlus,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { likeVideosState, VideoPayload } from "../../types/videos";
import { BUTTON, FROM } from "../../util/constants";
import {
  addToLikeVideosRequest,
  removeFromLikeVideosRequest,
} from "../../actions/likes";
import {
  addToWatchLaterVideosRequest,
  removeFromWatchLaterVideosRequest,
} from "../../actions/watchlater";
import { historyState } from "../../types/history";
import {
  addToHistoryVideosRequest,
  removeFromHistoryVideosRequest,
} from "../../actions/history";
import { authState } from "../../types/auth";
import { parseViews } from "../../util/views";
import { playlistState } from "../../types/playlist";
import { watchLaterState } from "../../types/watchlater";
import Modal from "../Modal";
import AddToPlaylist from "../../components/Playlist/AddToPlaylist";
import CreatePlaylist from "../../components/Playlist/Create";

const Video = ({
  video,
  callBackData = () => {},
  from,
}: {
  video: VideoPayload;
  callBackData?: Function;
  from: string;
}) => {
  const [showOptions, setOptions] = useState<boolean>(false);
  const [playlistAction, setPlaylistAction] = useState<{
    _id: string;
    video: any;
    open: string | null;
  }>({ _id: "", video: {}, open: null });
  const { isLoggedIn = false } = useSelector(
    (state: { auth: authState }) => state.auth
  );

  const { allLikedVideos = {} } = useSelector(
    (state: { likes: likeVideosState }) => state.likes
  );

  const { allwatchlaterVideos = {} } = useSelector(
    (state: { watchlater: watchLaterState }) => state.watchlater
  );

  const { allhistoryVideos = {} } = useSelector(
    (state: { history: historyState }) => state.history
  );

  const dispatch = useDispatch();

  const renderVideoActions = {
    [FROM.HOME]: (video: VideoPayload) => (
      <>
        <div
          onClick={() =>
            dispatch(
              allLikedVideos[video.id]
                ? removeFromLikeVideosRequest({ video: video })
                : addToLikeVideosRequest({ video: video })
            )
          }
        >
          <FontAwesomeIcon
            className={allLikedVideos[video.id] ? "action-active" : ""}
            icon={faThumbsUp}
          />
          {allLikedVideos[video.id] ? "Liked" : "Like"}
        </div>
        <div
          onClick={() =>
            setPlaylistAction({
              ...playlistAction,
              open: "ADD",
              video: video,
            })
          }
        >
          <FontAwesomeIcon icon={faPlayCircle} />
          Add To Playlist
        </div>
        <div
          onClick={() =>
            dispatch(
              allwatchlaterVideos[video.id]
                ? removeFromWatchLaterVideosRequest({ video: video })
                : addToWatchLaterVideosRequest({ video: video })
            )
          }
        >
          <FontAwesomeIcon
            className={allwatchlaterVideos[video.id] ? "action-active" : ""}
            icon={faClock}
          />
          {allwatchlaterVideos[video.id]
            ? "Added to Watchlater"
            : "Add to Watchlater"}
        </div>
      </>
    ),
    [FROM.HISTORY]: (video: VideoPayload) => (
      <div>
        <FontAwesomeIcon
          onClick={() =>
            dispatch(
              allhistoryVideos[video.id]
                ? removeFromHistoryVideosRequest({ video: video })
                : addToHistoryVideosRequest({ video: video })
            )
          }
          icon={faTrash}
        />
      </div>
    ),
    [FROM.PLAYLIST]: (video: VideoPayload) => (
      <div>
        <div onClick={() => callBackData({ video: video })}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    ),
    [FROM.LIKES]: (video: VideoPayload) => (
      <div>
        <div onClick={() => dispatch(addToLikeVideosRequest({ video: video }))}>
          <FontAwesomeIcon icon={faThumbsUp} />
        </div>
        <FontAwesomeIcon icon={faClock} />
      </div>
    ),
  };

  return (
    <>
      <div className="video">
        <Link to={`/watch/${video.id}`}>
          <img
            src={video.snippet.thumbnails.high.url}
            className="video-thumbnail"
          />
        </Link>
        <div className="video-header">
          <Link to={`/watch/${video.id}`}>
            <div className="video-title">{video.snippet.title}</div>
          </Link>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            onClick={() => setOptions(!showOptions)}
          />
          {showOptions && (
            <ul className="video-options">{renderVideoActions[from](video)}</ul>
          )}
        </div>

        <div className="video-bottom">
          <div className="video-channel">
            {video?.snippet?.channelTitle}
            {video?.status?.publicStatsViewable && (
              <FontAwesomeIcon className="verified-icon" icon={faCheckCircle} />
            )}
          </div>
          {video?.statistics?.viewCount && (
            <div className="video-channel">
              {parseViews(video?.statistics?.viewCount)}
            </div>
          )}
          {/* <div>{isLoggedIn && renderVideoActions[from](video)}</div> */}
        </div>
      </div>
      {playlistAction.open && (
        <Modal
          header="Add Video To Playlist"
          Open={true}
          close={() => setPlaylistAction({ ...playlistAction, open: null })}
        >
          <>
            <div
              className="create-playlist-on-go"
              onClick={() => {
                setPlaylistAction({
                  ...playlistAction,
                  open: playlistAction.open === "ADD" ? "CREATE" : "ADD",
                });
              }}
            >
              {playlistAction.open === "ADD" ? "Create New" : "ADD"}
            </div>
            {playlistAction.open === "ADD" ? (
              <AddToPlaylist
                playlistAction={playlistAction}
                setPlaylistAction={setPlaylistAction}
              />
            ) : (
              <CreatePlaylist
                setOpen={() => {
                  setPlaylistAction({ ...playlistAction, open: "ADD" });
                }}
              />
            )}
          </>
        </Modal>
      )}
    </>
  );
};

export default Video;