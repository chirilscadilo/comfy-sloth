import {
  createUserDocumentFromAuth,
  createUserWithEmailAndPasswordFromAuth,
} from "../../firebase/firebase-config";
import "./registerForm.styles..scss";
import { useState } from "react";
import { getCurrentUser } from "../../store/reducers/UserSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { ModalWindow } from "../modalWindow/modalWIndw";
import { Button, ButtonTypes } from "../button/button";

const defaultFromFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const [error, setError] = useState<string | null>(null);

  const resetFromFields = () => {
    setFormFields(defaultFromFields);
  };

  const handleSubmitSignUp = async (event: any) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Password does not match");
      return;
    }
    try {
      const { user }: any = await createUserWithEmailAndPasswordFromAuth(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });

      dispatch(getCurrentUser({ ...user, displayName }));

      resetFromFields();
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Account already created");
          break;
        default:
          setError(error.code);
      }
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <form className="sign-up-form" action="" onSubmit={handleSubmitSignUp}>
      <input
        type="text"
        name="displayName"
        required
        placeholder="Name"
        value={displayName}
        onChange={handleChange}
      />
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
      <input
        type="password"
        name="confirmPassword"
        required
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={handleChange}
      />
      <Button buttonType="simple" type={ButtonTypes.Submit}>
        Sign Up
      </Button>

      {error && (
        <ModalWindow
          text={error}
          handleClose={() => setError(null)}
        ></ModalWindow>
      )}
    </form>
  );
};
