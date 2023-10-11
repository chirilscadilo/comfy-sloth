import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.styles.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MenuBurger from "../menuBurger/menuBurger";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { removeUser } from "../../store/reducers/UserSlice";
import { useAuth } from "../../hooks/use-auth";

export function Navbar() {
  const dispatch = useAppDispatch();

  const totalProductsAmount = useAppSelector(
    (state) => state.products.totalAmount
  );
  const { isAuth } = useAuth();

  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [isMenuClicked, setIsMenuCLicked] = useState(false);

  //toggle Menu
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
    } else {
      setBurgerClass("burger-bar unclicked");
    }
    setIsMenuCLicked(!isMenuClicked);
  };

  return (
    <div>
      <nav className="navbar-container">
        <Link to="/">
          <img src="../src/assets/logo.svg" alt="Logo" />
        </Link>

        <div className="navbar-links-container">
          <Link to="/">
            <span>Home</span>
          </Link>
          <Link to="/about">
            <span>About</span>
          </Link>
          <Link to="/products">
            <span>Products</span>
          </Link>
        </div>

        <div className="navbar-cart-login">
          <Link to="/cart" className="shopping-cart-button">
            Cart
            <ShoppingCartIcon sx={{ fontSize: "28px", margin: "8px" }} />
            <div className="rounded-circle">{totalProductsAmount}</div>
          </Link>
          {/* isAuth is a boolean returned from use-auth hook. If it's true - redux state has a user value  */}
          {isAuth ? (
            <a onClick={() => dispatch(removeUser())} className="login-button">
              Sign Out
            </a>
          ) : (
            <Link to="/login" className="login-button">
              Log In
              <HowToRegIcon sx={{ fontSize: "28px", margin: "8px" }} />
            </Link>
          )}
        </div>

        <div className="burger-container" onClick={updateMenu}>
          <span className={burger_class}></span>
          <span className={burger_class}></span>
          <span className={burger_class}></span>
        </div>
      </nav>

      <MenuBurger
        active={isMenuClicked}
        setActive={setIsMenuCLicked}
        burgerClass={burger_class}
        setBurgerClass={setBurgerClass}
      />
    </div>
  );
}
