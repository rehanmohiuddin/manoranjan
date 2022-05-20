import React, { useEffect, useState } from "react";
import Form from "../../components/Form";
import "./index.scss";
import useFormValidator from "../../hooks/useFormValidator";
import Button from "../../components/Button";
import { BUTTON } from "../../util/constants";
import Header from "../../components/Header";
import {
  faEnvelopeSquare,
  faKey,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import AuthLeft from "../../components/AuthLeft";
import { stateProp } from "../../types/form";

function Index() {
  const [fields, setField] = useState<stateProp>({
    firstName: {
      name: "First Name",
      value: "",
      type: "text",
      placeholder: "Enter First Name",
      tagName: "firstName",
      required: true,

      icon: faUser,
      constraints: {
        regEx: /(.*[a-z]){3}/i,
        msg: "Name Atleast 3 Char",
      },
      isEmpty: false,
    },
    lastName: {
      name: "Last Name",
      value: "",
      type: "text",
      placeholder: "Enter Last Name",
      tagName: "lastName",
      required: true,

      icon: faUser,
      constraints: {
        regEx: /(.*[a-z]){3}/i,
        msg: "Name Atleast 3 Char",
      },
      isEmpty: false,
    },
    email: {
      name: "Email",
      value: "",
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
      value: "",
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
    confirmPassword: {
      name: "Confirm Password",
      value: "",
      type: "password",
      placeholder: "Confirm Password",
      tagName: "confirmPassword",
      required: true,
      constraints: {
        regEx: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
        msg: "Password Not Valid",
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
    setField({
      ...fields,
      [name]: { ...fields[name], value: value, isEmpty: false },
    });
    textInput(name, value);
  };

  const submit = () => {
    const isEmpty = isFieldsEmpty();
    const payload: {
      [key: string]: string;
    } = {};
    Object.keys(fields).forEach((key) => {
      payload[key] = fields[key].value;
    });
  };

  const resendEmail = () => {
    const payload: {
      [key: string]: string;
    } = {};
    Object.keys(fields).forEach((key) => {
      payload[key] = fields[key].value;
    });
  };

  return (
    <div className="auth-container">
      <Header />

      <div className="login-container">
        <AuthLeft />
        <div className="login-box">
          <Form
            title={"Join Now"}
            fields={fields}
            onTextInput={textFromForm}
            submitCallBack={submit}
            errorState={errorState}
            loading={false}
            formFor={"Register"}
          />
          <div className="login-btn">
            <Button
              title={" Already Have An Account ?"}
              style={BUTTON.LINK}
              type={BUTTON.LINK}
              linkTo={"/login"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
