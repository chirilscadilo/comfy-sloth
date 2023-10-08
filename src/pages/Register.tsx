import { Link } from "react-router-dom";
import { RegisterForm } from "../components/signUp-form/registerForm";
import "./Register.styles.scss";

export const Register = () => {
  return (
    <div className="sign-up-container">
      <h2 className="sign-up-title">Don't have an account?</h2>
      <span className="sign-up-here">Sign Up here</span>
      <RegisterForm />
      <span className="already-have-account">Already have an account?</span>
      <Link className="log-in-link" to="/login">
        Log In
      </Link>
    </div>
  );
};
