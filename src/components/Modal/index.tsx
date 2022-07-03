import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./index.scss";
import ReactPortal from "../ReactPortal";

interface Props {
  trigger?: React.ReactNode;
  Open?: boolean;
  children: React.ReactNode;
  header: string;
  ref?: { current: any };
  close?: any;
}

const Modal = ({ children, trigger, header, Open, close }: Props) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const closeModal = () => {
    setOpen(false);
    close();
  };

  const open = () => setOpen(true);

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  useEffect(() => {
    Open && setOpen(Open);
  }, [Open]);

  return (
    <ReactPortal>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      {isOpen && (
        <div
          onClick={closeModal}
          id="kash-modal"
          className="kash-modal-container"
        >
          <div onClick={(e) => e.stopPropagation()} className="kash-modal">
            <div className="modal-header">
              <div className="modal-header-title ">{header}</div>
              <FontAwesomeIcon onClick={closeModal} icon={faClose} size="2x" />
            </div>

            <div className="modal-container"> {children} </div>
          </div>
        </div>
      )}
    </ReactPortal>
  );
};

export default Modal;
