import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import "./menuBurger.styles.scss";
import { SetStateAction } from "react";

interface MenuBurgerProps {
  active: boolean;
  setActive: React.Dispatch<SetStateAction<boolean>>;
  burgerClass: string;
  setBurgerClass: React.Dispatch<SetStateAction<string>>;
}

const MenuBurger = (menuObj: MenuBurgerProps) => {
  return (
    <>
      <div className={menuObj.active ? "menu active" : "menu"}>
        <div className="blur" />
        <div className="menu-content">
          <div className="menu-links-container">
            <Link
              to="/"
              onClick={() => {
                menuObj.setActive(false);
                menuObj.setBurgerClass("burger-bar unclicked");
              }}
            >
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              onClick={() => {
                menuObj.setActive(false);
                menuObj.setBurgerClass("burger-bar unclicked");
              }}
            >
              <span>About</span>
            </Link>
            <Link
              to="/products"
              onClick={() => {
                menuObj.setActive(false);
                menuObj.setBurgerClass("burger-bar unclicked");
              }}
            >
              <span>Products</span>
            </Link>
          </div>

          <div className="menu-cart-login">
            <a onClick={() => menuObj.setActive(false)}>
              Cart
              <ShoppingCartIcon sx={{ fontSize: "28px", margin: "8px" }} />
            </a>

            <a onClick={() => menuObj.setActive(false)}>
              Login
              <HowToRegIcon sx={{ fontSize: "28px", margin: "8px" }} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBurger;
