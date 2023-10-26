import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import "./menuBurger.styles.scss";
import { SetStateAction } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { useAuth } from "../../hooks/use-auth";
import { removeUser } from "../../store/reducers/UserSlice";

interface MenuBurgerProps {
  active: boolean;
  setActive: React.Dispatch<SetStateAction<boolean>>;
  burgerClass: string;
  setBurgerClass: React.Dispatch<SetStateAction<string>>;
}

const MenuBurger = (menuObj: MenuBurgerProps) => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const totalProductsAmount = useAppSelector(
    (state) => state.products.totalAmount
  );

  return (
    <>
      <div className={menuObj.active ? "menu active" : "menu"}>
        <div className="blur" />
        <div className="menu-content">
          {isAuth ? (
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
              <Link
                to="/products"
                onClick={() => {
                  menuObj.setActive(false);
                  menuObj.setBurgerClass("burger-bar unclicked");
                }}
              >
                <span>Account</span>
              </Link>
            </div>
          ) : (
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
          )}

          <div className="menu-cart-login">
            <Link
              to="/cart"
              className="shopping-cart-button"
              onClick={() => menuObj.setActive(false)}
            >
              Cart
              <ShoppingCartIcon sx={{ fontSize: "28px", margin: "8px" }} />
              <div className="rounded-circle">{totalProductsAmount}</div>
            </Link>

            {isAuth ? (
              <a
                href=""
                className="login-button"
                onClick={() => dispatch(removeUser())}
              >
                Sign Out
              </a>
            ) : (
              <Link
                to="/login"
                className="login-button"
                onClick={() => menuObj.setActive(false)}
              >
                Login
                <HowToRegIcon sx={{ fontSize: "28px", margin: "8px" }} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBurger;
