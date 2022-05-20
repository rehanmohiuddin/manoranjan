import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface stateProp {
  [key: string]: {
    name: string;
    value: string;
    type: string;
    placeholder: string;
    tagName: string;
    required: boolean;
    constraints: {
      regEx: RegExp;
      msg: string;
    };
    icon: IconDefinition;
    isEmpty: boolean;
  };
}
