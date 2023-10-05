import "./LogIn.styles.scss";
import { LogInForm } from "../components/logIn-form/logInForm";
import { Link } from "react-router-dom";

export const LogIn = () => {
  return (
    <div className="log-in-container">
      <h3 className="log-in-title">Log In with your email & password</h3>
      <span className="log-in-span">Already have an account</span>
      <LogInForm />
      <span className="dont-have-account">Don't have an account?</span>
      <Link className="register-link" to="/register">
        Register
      </Link>
    </div>
  );
};
