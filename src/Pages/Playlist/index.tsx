import React, { useEffect, useRef, useState } from "react";
import HomeContainer from "../../components/HomeContainer";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faPlayCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { BUTTON } from "../../util/constants";
import Modal from "../../components/Modal";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist, getAllPlaylists } from "../../actions/playlist";
import { v4 as uuid } from "uuid";
import { playlistState } from "../../types/playlist";
import playlistThumbnail from "../../assets/playlist_thumbail.png";
import { Link } from "react-router-dom";

function Index() {
  const name = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { playlists = [], allPlaylists = {} } = useSelector(
    (state: { playlist: playlistState }) => state.playlist
  );
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    dispatch(getAllPlaylists());
  }, []);

  const createPlaylistHandler = () => {
    name.current?.value &&
      dispatch(
        createPlaylist({
          _id: uuid(),
          name: name.current?.value,
        })
      );
    setOpen(false);
  };

  return (
    <HomeContainer>
      <Button
        callBack={() => setOpen(true)}
        type={BUTTON.BUTTON}
        style={BUTTON.OUTLINE}
      >
        <div>
          <FontAwesomeIcon icon={faPlus} />
          Create Playlist
        </div>
      </Button>
      {open && (
        <Modal
          Open={true}
          close={() => setOpen(false)}
          ref={ref}
          header="Create Playlist"
        >
          <div className="create-paylist-container">
            <label>PlayList Name *</label>
            <div className="playlist-input">
              <FontAwesomeIcon icon={faPlayCircle} />{" "}
              <input ref={name} placeholder="Ex : Lofi" />
            </div>
            <div className="create-playlist-bottom">
              <Button
                callBack={() => setOpen(false)}
                type={BUTTON.BUTTON}
                style={BUTTON.OUTLINE}
              >
                <div>
                  <FontAwesomeIcon icon={faCancel} />
                  Cancel
                </div>
              </Button>
              <Button
                callBack={createPlaylistHandler}
                type={BUTTON.BUTTON}
                style={BUTTON.PRIMARY}
              >
                <div>
                  <FontAwesomeIcon icon={faPlus} />
                  Create
                </div>
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <div className="playlists">
        {playlists.map((_id) => (
          <Link to={"/playlist/videos?playlist=" + _id} className="playlist">
            <img src={playlistThumbnail} />
            <div className="title"> {allPlaylists[_id]?.name}</div>
          </Link>
        ))}
      </div>
    </HomeContainer>
  );
}

export default Index;
