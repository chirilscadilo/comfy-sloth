import {
  createUserDocumentFromAuth,
  createUserWithEmailAndPasswordFromAuth,
} from "../../firebase/firebase-config";
import "./registerForm.styles..scss";
import { useState } from "react";
import { getCurrentUser } from "../../store/reducers/UserSlice";
import { useAppDispatch } from "../../hooks/hooks";

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

  const resetFromFields = () => {
    setFormFields(defaultFromFields);
  };

  const handleSubmitSignUp = async (event: any) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password does not match");
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
      if (error.message === "auth/email-already-in-use") {
        alert("User already created.");
      }
      console.log("error creating the user", error.message);
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
      <button className="sign-up-btn" type="submit">
        Sign Up
      </button>
    </form>
  );
};
