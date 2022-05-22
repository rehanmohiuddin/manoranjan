import React from "react";
import "./index.scss";
import { getVideoSuccessPayload } from "../../types/videos";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function Index({
  title,
  items,
}: {
  title: string;
  items: Array<getVideoSuccessPayload>;
}) {
  return (
    <div className="video-list-container">
      <div className="video-list-title">{title}</div>
      <div className="video-list">
        {items.map((video) => (
          <Link to={`/video/${video.id}`} className="video">
            <img
              src={video.snippet.thumbnails.high.url}
              className="video-thumbnail"
            />
            <div className="video-title">{video.snippet.title}</div>
            <div className="video-bottom">
              <div className="video-channel">{video.snippet.channelTitle}</div>
              <FontAwesomeIcon icon={faClock} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Index;
