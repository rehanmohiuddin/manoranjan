import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import "./index.scss";
import Button from "../Button";
import { BUTTON } from "../../util/constants";

function Index() {
  const {
    message = "",
    action = "",
    toast = {
      close: () => {},
    },
    messageType = "",
  } = {};

  useEffect(() => {
    setTimeout(() => {
      toast.close();
    }, 5000);
    return () => {
      toast.close();
    };
  }, []);

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
            <FontAwesomeIcon icon={faTimesCircle} onClick={toast.close} />
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
