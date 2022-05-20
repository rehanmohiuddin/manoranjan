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
        <Button
          title={"Read More"}
          style={BUTTON.PRIMARY}
          type={BUTTON.BUTTON}
          linkTo={"/login"}
        />
      </div>
    </div>
  );
}

export default Index;
