import "./modalWindow.styles.scss";
import ReactDOM from "react-dom";

type ModalWindowProps = {
  handleClose: () => void;
  handleRemoveUSer: () => void;
};
const portalDiv = document.body;

export function ModalWindow({
  handleClose,
  handleRemoveUSer,
}: ModalWindowProps) {
  return ReactDOM.createPortal(
    <>
      <div className="overlay">
        <div className="modal-window">
          Sign Out?
          <button onClick={handleClose} className="modal-window-close-btn">
            Close
          </button>
          <button onClick={handleRemoveUSer}>Yes</button>
        </div>
      </div>
    </>,
    portalDiv
  );
}
