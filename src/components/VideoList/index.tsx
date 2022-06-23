import React, { useState } from "react";
import "./index.scss";
import { likeVideosState, VideoPayload } from "../../types/videos";
import { Link, useNavigate } from "react-router-dom";
import { FROM } from "../../util/constants";
import Video from "./Video";

function Index({
  title,
  items,
  from = FROM.HOME,
  callBackData = () => {},
}: {
  title: string;
  items: Array<VideoPayload>;
  from?: string;
  callBackData?: Function;
}) {
  const navigate = useNavigate();

  const isEmpty = items.length === 0 ?? true;

  return (
    <div className="video-list-container">
      <div className="video-list-title">{title}</div>
      <div className="video-list">
        {isEmpty ? (
          <div className="empty-message">
            <div>No Videos</div>
            <Link to={"/"}>Add Here</Link>
          </div>
        ) : (
          items.map((video) => (
            <>
              {video.snippet && (
                <Video video={video} callBackData={callBackData} from={from} />
              )}
            </>
          ))
        )}
      </div>
    </div>
  );
}

export default Index;
