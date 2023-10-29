import "./logOut.styles.scss";
import { useAppDispatch } from "../hooks/hooks";
import { removeUser } from "../store/reducers/UserSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const LogOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="log-out-form">
      <h3 className="log-out-title">Do you want to Logout?</h3>
      <div className="log-out-btn-container">
        <Link
          to="/"
          onClick={() => dispatch(removeUser())}
          className="log-out-btn"
        >
          Log Out
        </Link>
        <button className="cancel-log-out" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </div>
    </div>
  );
};
