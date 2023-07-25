import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.styles.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HowToRegIcon from "@mui/icons-material/HowToReg";

export function Navbar() {
  //to change burger classes
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuCLicked] = useState(false);

  //toggle Menu
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuCLicked(!isMenuClicked);
  };

  return (
    <div>
      <nav>
        <div className="navbar-container">
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
            <a>
              Cart
              <ShoppingCartIcon sx={{ fontSize: "28px", margin: "8px" }} />
            </a>

            <a>
              Login
              <HowToRegIcon sx={{ fontSize: "28px", margin: "8px" }} />
            </a>
          </div>

          <div className="burger-container" onClick={updateMenu}>
            <span className={burger_class}></span>
            <span className={burger_class}></span>
            <span className={burger_class}></span>
          </div>
        </div>
      </nav>

      <div className={menu_class}>
        <div className="burger-header">
          <Link to="/">
            <img src="../src/assets/logo.svg" alt="Logo" />
          </Link>

          <div className="burger-container" onClick={updateMenu}>
            <span className={burger_class}></span>
            <span className={burger_class}></span>
            <span className={burger_class}></span>
          </div>
        </div>
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
          <a>
            Cart
            <ShoppingCartIcon sx={{ fontSize: "28px", margin: "8px" }} />
          </a>
          <a>
            Login
            <HowToRegIcon sx={{ fontSize: "28px", margin: "8px" }} />
          </a>
        </div>

        <div className="burger-container" onClick={updateMenu}>
          <span className={burger_class}></span>
          <span className={burger_class}></span>
          <span className={burger_class}></span>
        </div>
      </div>
    </div>
  );
}
