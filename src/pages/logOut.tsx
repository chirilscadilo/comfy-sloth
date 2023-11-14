import "./logOut.styles.scss";
import { useAppDispatch } from "../hooks/hooks";
import { removeUser } from "../store/reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ModalWindow, WindowTypes } from "../components/modalWindow/modalWIndw";
import { Button } from "../components/button/button";
import { useAuth } from "../hooks/use-auth";

export const LogOut = () => {
  const { isAuth } = useAuth();
  const [notification, setNotification] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
      if (!isAuth) navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  const handleLogOut = () => {
    try {
      dispatch(removeUser());
      setNotification("Log out successfully");
    } catch (error: any) {
      switch (error.code) {
        default:
      }
    }
  };
  return (
    <div className="log-out-form">
      <h3 className="log-out-title">Do you want to Logout?</h3>
      <div className="log-out-btn-container">
        <Button buttonType="simple" onClick={handleLogOut}>
          Log Out
        </Button>
        <Button buttonType="google" onClick={() => navigate(-1)}>
          Cancel
        </Button>
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
