import "./modalWindow.styles.scss";
import ReactDOM from "react-dom";
import { Button } from "../button/button";

type BackDropProps = {
  handleClose: () => void;
};

type ModalWindowProps = {
  handleClose: () => void;
  text: string;
};

export const BackDrop = ({ handleClose }: BackDropProps) => {
  return <div className="overlay" onClick={handleClose}></div>;
};

export const ModalOverlay = ({ handleClose, text }: ModalWindowProps) => {
  return (
    <>
      <div className="modal-window">
        <h5 className="modal-text">{text}</h5>
        <div className="btn-container">
          <Button buttonType={"simple"} onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </>
  );
};

export const ModalWindow = ({ handleClose, text }: ModalWindowProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop handleClose={handleClose} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay handleClose={handleClose} text={text} />,
        document.getElementById("overlay-root")!
      )}
    </>
  );
};
