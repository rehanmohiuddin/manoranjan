import { useState } from "react";
import Modal from "../Modal";
import CreatePlaylist from "./Create";
import AddToPlaylist from "./AddToPlaylist";
import { VideoPayload, VideoPayloadSuggested } from "../../types/videos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

const Index = ({ video }: { video: VideoPayload | VideoPayloadSuggested }) => {
  const [playlistAction, setPlaylistAction] = useState<{
    _id: string;
    video: any;
    open: string | null;
  }>({ _id: "", video: {}, open: null });
  return (
    <>
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

export default Index;
