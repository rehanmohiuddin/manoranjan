import React, { useEffect, useState } from "react";
import Form from "../../components/Form";
import Logo from "../../assets/SawaalJawab -mailer.png";
import "../Register/index.scss";
import useFormValidator from "../../hooks/useFormValidator";
import Button from "../../components/Button";
import { BUTTON } from "../../util/constants";
import { faEnvelopeSquare, faKey } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthLeft from "../../components/AuthLeft";
import Header from "../../components/Header";
import { stateProp } from "../../types/form";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../actions/auth";
import { AppState } from "../../reducers";

function Index() {
  const dispatch = useDispatch();
  const { loading, isLoggedIn } = useSelector((state: AppState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [fields, setField] = useState<stateProp>({
    email: {
      name: "Email",
      value: "rehan.4942@gmail.com",
      type: "email",
      placeholder: "johndoe@gmail.com",
      tagName: "email",
      required: true,
      constraints: {
        regEx:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        msg: "Email is Not Valid",
      },
      icon: faEnvelopeSquare,
      isEmpty: false,
    },
    password: {
      name: "Password",
      value: "Test@123",
      type: "password",
      placeholder: "Enter Password",
      tagName: "password",
      required: true,
      constraints: {
        regEx: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
        msg: "Password is Not Valid",
      },
      icon: faKey,
      isEmpty: false,
    },
  });
  const [textInput, setFields, errorState, isFieldsEmpty] = useFormValidator();

  useEffect(() => {
    setFields(fields);
  }, [fields]);

  const textFromForm = (name: string, value: string) => {
    setField({ ...fields, [name]: { ...fields[name], value: value } });
    textInput(name, value);
  };

  const submit = () => {
    const isEmpty = isFieldsEmpty();
    let payload: {
      email: string;
      password: string;
    } = {
      email: fields.email.value,
      password: fields.password.value,
    };
    dispatch(loginRequest(payload));
  };

  useEffect(() => {
    const { state }: any = location;
    const from = state?.from.pathname || "/";
    isLoggedIn && navigate(from, { replace: true });
  }, [isLoggedIn]);

  return (
    <div className="auth-container">
      <Header />
      <div className="login-container">
        <AuthLeft />
        <div className="login-box">
          <Form
            title={"Welcome Back"}
            fields={fields}
            onTextInput={textFromForm}
            submitCallBack={submit}
            errorState={errorState}
            loading={loading}
            formFor={"Login"}
          />
          <div className="login-btn">
            <Button
              title={"New User ?"}
              style={BUTTON.LINK}
              type={BUTTON.LINK}
              linkTo={"/register"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
