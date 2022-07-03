import { ReactNode, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

const ReactPortal = ({
  children,
  wrapperId = "modal-wrapper",
}: {
  children: ReactNode;
  wrapperId?: string;
}) => {
  const [wrappeEle, setWrapper] = useState<any>(null);
  function addToBody() {
    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", wrapperId);
    document.body.appendChild(wrapper);
    return wrapper;
  }
  useLayoutEffect(() => {
    let ele = document.getElementById("modal-wrapper");
    if (!ele) {
      ele = addToBody();
    }
    setWrapper(ele);
  }, [wrapperId]);
  if (wrappeEle === null) return null;
  return createPortal(children, wrappeEle);
};

export default ReactPortal;
