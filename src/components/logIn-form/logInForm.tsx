import "./logIn.styles.scss";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithEmailAndPasswordFromAuth,
} from "../../firebase/firebase-config";
import { useState } from "react";
import { getCurrentUser } from "../../store/reducers/UserSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";

const defaultFromFields = {
  email: "",
  password: "",
};

export const LogInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formFileds, setFormFields] = useState(defaultFromFields);
  const { email, password } = formFileds;

  const resetFromFields = () => {
    setFormFields(defaultFromFields);
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);

    dispatch(getCurrentUser(user));
  };

  const handleSubmitLogIn = async (event: any) => {
    event.preventDefault();
    try {
      const { user }: any = await signInWithEmailAndPasswordFromAuth(
        email,
        password
      );
      dispatch(getCurrentUser(user));
      resetFromFields();
      navigate(-1);
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        case "auth/invalid-login-credentials":
          alert("incorect password for email");
          break;
        default:
          console.log(error);
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
        <button type="submit" className="log-in-btn">
          Log In
        </button>
        <button onClick={logGoogleUser} className="google-log-in">
          Google Sign In
        </button>
      </div>
    </form>
  );
};
