import React from "react";
import { Link } from "react-router-dom";
import { BUTTON } from "../../util/constants";
import "./index.scss";

interface Props {
  title?: string;
  style: string;
  type: string;
  linkTo?: string;
  replace?: boolean;
  callBack?: any;
  children?: React.ReactNode;
}

function Index({
  title,
  style = BUTTON.PRIMARY,
  type = BUTTON.BUTTON,
  linkTo = "/",
  callBack,
  replace = false,
  children,
}: Props) {
  const getBtnType = {
    [BUTTON.PRIMARY]: "btn-primary",
    [BUTTON.OUTLINE]: "btn-outline",
    [BUTTON.LINK]: "btn-link",
  };

  const getButton = {
    [BUTTON.BUTTON]: (
      <div onClick={callBack} className={"btn " + getBtnType[style]}>
        {children ?? title}
      </div>
    ),
    [BUTTON.LINK]: (
      <Link className={getBtnType[style]} to={linkTo} replace={replace}>
        {children ?? title}
      </Link>
    ),
  };

  return getButton[type];
}

export default Index;
