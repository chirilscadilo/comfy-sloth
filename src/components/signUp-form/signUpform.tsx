import {
  createUserDocumentFromAuth,
  createUserWithEmailAndPasswordFromAuth,
} from "../../firebase/firebase-config";
import "./signUpform.styles.scss";
import { useState } from "react";

const defaultFromFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { name, email, password, confirmPassword } = formFields;

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
      await createUserDocumentFromAuth(user, { name });
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
        name="name"
        required
        placeholder="Name"
        value={name}
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
