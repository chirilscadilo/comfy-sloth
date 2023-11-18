import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.styles.scss";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MenuBurger from "../menuBurger/menuBurger";
import { useAppSelector } from "../../hooks/hooks";
import { useAuth } from "../../hooks/use-auth";
import { DropdownMenu } from "../dropDownMenu/dropDownMenu";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export function Navbar() {
  const totalProductsAmount = useAppSelector(
    (state) => state.products.totalAmount
  );

  const { isAuth, displayName } = useAuth();

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

  const displayNameArr: any = displayName?.split(/ (.*)/);

  return (
    <div className="container">
      <nav className="navbar-container">
        <Link to="/">
          <img src="logo.svg" alt="Logo" />
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
          <Link to="/favorite" className="shopping-cart-button">
            <FavoriteBorderOutlinedIcon
              sx={{ color: "black", fontSize: "28px", margin: "8px" }}
            />
          </Link>
          <Link to="/cart" className="shopping-cart-button">
            <ShoppingCartOutlinedIcon
              sx={{ fontSize: "28px", margin: "8px" }}
            />
            <div className="rounded-circle">{totalProductsAmount}</div>
          </Link>
          {/* isAuth is a boolean returned from use-auth hook. If it's true - redux state has a user value  */}
          {isAuth ? (
            <DropdownMenu displayName={displayNameArr[0]} />
          ) : (
            <Link to="/login" className="login-button">
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
