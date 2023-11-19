import "./logIn.styles.scss";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithEmailAndPasswordFromAuth,
  getUserDataFromDocs,
} from "../../firebase/firebase-config";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../store/reducers/UserSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { ModalWindow, WindowTypes } from "../modalWindow/modalWIndw";
import { Button, ButtonTypes } from "../button/button";
import { useAuth } from "../../hooks/use-auth";

const defaultFromFields = {
  email: "",
  password: "",
};

export const LogInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [formFileds, setFormFields] = useState(defaultFromFields);
  const { email, password } = formFileds;
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setNotification(null);
      if (isAuth) navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [error, notification]);

  const resetFromFields = () => {
    setFormFields(defaultFromFields);
  };

  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);

      dispatch(getCurrentUser({ ...user, displayName: user.displayName }));
      setNotification("Log In successfully!");
    } catch (error: any) {
      switch (error.code) {
        default:
          setError(error.code);
      }
    }
  };

  const handleSubmitLogIn = async (event: any) => {
    event.preventDefault();
    try {
      const { user }: any = await signInWithEmailAndPasswordFromAuth(
        email,
        password
      );
      const getDisplayName = await getUserDataFromDocs(user.uid);

      dispatch(getCurrentUser({ ...user, displayName: getDisplayName }));
      setNotification("Log In successfully!");
      resetFromFields();
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          setError("Incorect password");
          break;
        case "auth/user-not-found":
          setError("No user associated with this email");
          break;
        case "auth/invalid-login-credentials":
          setError("Incorect password or email");
          break;
        default:
          setError(error.code);
      }
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFileds, [name]: value });
  };

  return (
    <form onSubmit={handleSubmitLogIn} className="log-in-form">
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        value={password}
        onChange={handleChange}
      />
      <div className="log-in-btn-container">
        <Button type={ButtonTypes.Submit} buttonType="simple">
          Log In
        </Button>
        <Button onClick={logGoogleUser} buttonType="google">
          Google Sign In
        </Button>
      </div>
      {error && (
        <ModalWindow
          text={error}
          handleClose={() => setError(null)}
          type={WindowTypes.Warning}
        ></ModalWindow>
      )}
      {notification && (
        <ModalWindow
          text={notification}
          handleClose={() => setNotification(null)}
          type={WindowTypes.Success}
        ></ModalWindow>
      )}
    </form>
  );
};
