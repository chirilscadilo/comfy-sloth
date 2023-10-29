import "./logIn.styles.scss";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithEmailAndPasswordFromAuth,
  getUserDataFromDocs,
} from "../../firebase/firebase-config";
import { useState } from "react";
import { getCurrentUser } from "../../store/reducers/UserSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { ModalWindow } from "../modalWindow/modalWIndw";
import { Button, ButtonTypes } from "../button/button";

const defaultFromFields = {
  email: "",
  password: "",
};

export const LogInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formFileds, setFormFields] = useState(defaultFromFields);
  const { email, password } = formFileds;
  const [error, setError] = useState<string | null>(null);

  const resetFromFields = () => {
    setFormFields(defaultFromFields);
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);

    dispatch(getCurrentUser({ ...user, displayName: user.displayName }));
    navigate(-1);
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
      resetFromFields();
      navigate(-1);
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
        ></ModalWindow>
      )}
    </form>
  );
};
