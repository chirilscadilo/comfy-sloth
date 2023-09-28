import "./SignIn.styles.scss";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../data/firebase-config";

export const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
    </div>
  );
};
