import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addVideoToPlaylist } from "../../actions/playlist";
import { playlistState } from "../../types/playlist";
import { BUTTON } from "../../util/constants";
import Button from "../Button";

const AddToPlaylist = ({
  playlistAction,
  setPlaylistAction,
}: {
  playlistAction: any;
  setPlaylistAction: Function;
}) => {
  const { playlists = [], allPlaylists } = useSelector(
    (state: { playlist: playlistState }) => state.playlist
  );
  const dispatch = useDispatch();

  return (
    <>
      <select
        onChange={(e) =>
          setPlaylistAction({
            ...playlistAction,
            _id: e.target.value,
          })
        }
        className="select-playlists"
      >
        <option>Select</option>
        {playlists.map((_id) => (
          <option value={_id}>{allPlaylists[_id].name}</option>
        ))}
      </select>
      <div className="playlist-bottom">
        <Button
          callBack={() => {
            dispatch(
              addVideoToPlaylist({
                _id: playlistAction._id,
                video: playlistAction.video,
              })
            );
            setPlaylistAction({ ...playlistAction, open: null });
          }}
          type={BUTTON.BUTTON}
          style={BUTTON.PRIMARY}
        >
          <div>
            <FontAwesomeIcon icon={faPlus} />
            Add
          </div>
        </Button>
      </div>
    </>
  );
};

export default AddToPlaylist;
