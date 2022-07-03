import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faPlayCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { BUTTON } from "../../util/constants";
import { createPlaylist } from "../../actions/playlist";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

const CreatePlaylist = ({ setOpen = () => {} }: { setOpen: Function }) => {
  const name = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
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
  );
};

export default CreatePlaylist;
