import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import React, { useEffect, useRef, useState } from "react";
import { stateProp } from "../types/form";

function useFormValidator() {
  const [fields, setFields] = useState<stateProp>({});

  interface ErrorProp {
    name: string;
    errorMsg: string;
  }

  const [errorState, setErrorState] = useState<ErrorProp>({
    name: "",
    errorMsg: "",
  });

  const isFieldsEmpty = () => {
    let bool = false;
    Object.keys(fields).forEach((key) => {
      if (fields[key].value.length === 0) {
        setErrorState({ ...errorState, errorMsg: "Please Fill All Fields" });
        bool = true;
      }
    });
    return bool;
  };

  const textInput = (name: string, value: string) => {
    const validatorPromise = new Promise((resolve, reject) => {
      fields[name].constraints && !fields[name].constraints.regEx.test(value)
        ? reject({ name: name, errorMsg: fields[name].constraints.msg })
        : resolve(null);
    });

    const validatorWithPasswordPromise = new Promise((resolve, reject) => {
      validatorPromise
        .then(() =>
          fields.password === fields.confirmPassword
            ? resolve(null)
            : reject({ name: name, errorMsg: "Passwords Doesn't Match" })
        )
        .catch(() =>
          reject({ name: name, errorMsg: fields[name].constraints.msg })
        );
    });

    if (name === "password" && fields.confirmPassword) {
      validatorWithPasswordPromise
        .then((res: any) => {
          setErrorState(res);
          setFields({ ...fields, [name]: { ...fields[name] } });
        })
        .catch((err) => setErrorState(err));
    } else {
      validatorPromise
        .then((res: any) => {
          setErrorState(res);
          setFields({ ...fields, [name]: { ...fields[name] } });
        })
        .catch((err) => setErrorState(err));
    }
  };

  return [textInput, setFields, errorState, isFieldsEmpty] as const;
}

export default useFormValidator;
