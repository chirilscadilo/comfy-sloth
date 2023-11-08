import { Link } from "react-router-dom";
import { RegisterForm } from "../components/signUp-form/registerForm";
import "./Register.styles.scss";
import { useAuth } from "../hooks/use-auth";
import { Button } from "../components/button/button";

export const Register = () => {
  const { isAuth } = useAuth();
  return (
    <>
      {isAuth ? (
        <div className="sign-up-success-cintainer">
          <h2 className="sign-up-success">You have successfuly sign in.</h2>
          <h2 className="welcome">Welcome!</h2>
          <Link to="/products">
            <Button buttonType="simple">To Products</Button>
          </Link>
        </div>
      ) : (
        <div className="sign-up-container">
          <h2 className="sign-up-title">Don't have an account?</h2>
          <span className="sign-up-here">Sign Up here</span>
          <RegisterForm />
          <span className="already-have-account">Already have an account?</span>
          <Link className="log-in-link" to="/login">
            Log In
          </Link>
        </div>
      )}
    </>
  );
};
