import "./logOut.styles.scss";
import { useAppDispatch } from "../hooks/hooks";
import { removeUser } from "../store/reducers/UserSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ModalWindow, WindowTypes } from "../components/modalWindow/modalWIndw";
export const LogOut = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className="log-out-form">
      <h3 className="log-out-title">Do you want to Logout?</h3>
      <div className="log-out-btn-container">
        <Link
          to="/"
          onClick={() => {
            dispatch(removeUser()), setNotification("Log out successfully");
          }}
          className="log-out-btn"
        >
          Log Out
        </Link>
        <button className="cancel-log-out" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </div>
      {notification && (
        <ModalWindow
          text={notification}
          handleClose={() => setNotification(null)}
          type={WindowTypes.Success}
        ></ModalWindow>
      )}
    </div>
  );
};
