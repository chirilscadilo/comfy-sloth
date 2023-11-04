import "./modalWindow.styles.scss";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";

export enum WindowTypes {
  Success = "success",
  Warning = "warning",
  Info = "info",
}

type BackDropProps = {
  handleClose: () => void;
};

type ModalWindowProps = {
  handleClose: () => void;
  text: string;
  type?: WindowTypes | undefined;
};

export const BackDrop = ({ handleClose }: BackDropProps) => {
  return <div className="overlay" onClick={handleClose}></div>;
};

export const ModalOverlay = ({ handleClose, text, type }: ModalWindowProps) => {
  return (
    <>
      <div className={`modal-window-${type}`}>
        <h5 className="modal-text">{text}</h5>
        <a href="" onClick={handleClose}>
          <CloseIcon />
        </a>
      </div>
    </>
  );
};

export const ModalWindow = ({ handleClose, text, type }: ModalWindowProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop handleClose={handleClose} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay handleClose={handleClose} text={text} type={type} />,
        document.getElementById("overlay-root")!
      )}
    </>
  );
};
