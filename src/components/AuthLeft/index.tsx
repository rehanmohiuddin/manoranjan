import React from "react";
import Logo from "../../assets/icon.png";
import { BUTTON } from "../../util/constants";
import Button from "../Button";

function Index() {
  return (
    <div className="login-left">
      <img src={Logo} />
      <div>Watch Videos on the Go</div>
      <div className="readmore-btn">
        <a
          className="read-more"
          href="https://developers.google.com/youtube/v3"
          title={"Read More"}
          type={BUTTON.BUTTON}
          target="_blank"
        >
          Read More
        </a>
      </div>
    </div>
  );
}

export default Index;
