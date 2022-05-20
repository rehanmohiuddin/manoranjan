import React, { useEffect } from "react";
import "./index.scss";
import Button from "../Button";
import { BUTTON } from "../../util/constants";
import Loader from "../Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  fields: {
    [key: string]: {
      name: string;
      type: string;
      placeholder: string;
      tagName: string;
      required: boolean;
      icon: any;
    };
  };
  onTextInput: Function;
  submitCallBack: Function;
  errorState: { errorMsg: string; name: string };
  loading: boolean;
  formFor: string;
}

const Index = ({
  title,
  fields,
  onTextInput,
  submitCallBack,
  errorState,
  loading,
  formFor,
}: Props) => {
  return (
    <div className="form-container">
      <div className="form-title">{title}</div>
      <div className="error-msg">{errorState && errorState.errorMsg}</div>
      {Object.keys(fields).map((key) => {
        const { name, type, placeholder, tagName, required, icon } =
          fields[key];
        return (
          <div className="kash-container  kash-flex kash-justify-center kash-align-center  kash-gap input-container">
            <div id="kash-input-click">
              <label>
                {name} {required && <span>*</span>}
              </label>
              <div
                className={
                  errorState && errorState.name === key
                    ? "input error-border"
                    : "input"
                }
              >
                <FontAwesomeIcon size="1x" icon={icon} />
                <input
                  name={key}
                  onChange={(e) => {
                    onTextInput(key, e.target.value);
                    // textInput(key, e.target.value);
                  }}
                  className={"kash-input"}
                  type={type}
                  id="kash-input"
                  required={required}
                  placeholder={placeholder}
                />
              </div>
            </div>
          </div>
        );
      })}
      <div className="btn-submit">
        <Button
          title={"Submit"}
          type={BUTTON.BUTTON}
          style={BUTTON.PRIMARY}
          callBack={submitCallBack}
        />
      </div>
    </div>
  );
};

export default Index;
