import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import "./index.scss";
import Button from "../Button";
import { BUTTON } from "../../util/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../reducers";
import { closeToast } from "../../actions/toast";

function Index() {
  const {
    message = "",
    action,
    messageType = "",
  } = useSelector((state: AppState) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer: any = null;
    timer = setTimeout(() => {
      clearTimeout(timer);
      dispatch(closeToast());
    }, 5000);
  }, [message]);

  return (
    <>
      {message && (
        <div
          className={`kash-snackbar kash-flex kash-align-center kash-bg-gray `}
        >
          {message} !
          <div className="kash-flex kash-align-center actions">
            {action && (
              <Button
                type={BUTTON.BUTTON}
                style={BUTTON.PRIMARY}
                title={"OK"}
              />
            )}
            <FontAwesomeIcon
              icon={faTimesCircle}
              onClick={() => dispatch(closeToast())}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
