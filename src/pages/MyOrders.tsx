import "./MyOrders.styles.scss";
import { useAuth } from "../hooks/use-auth";
import { Button } from "../components/button/button";
import { Link } from "react-router-dom";

export const MyOrders = () => {
  //const { displayName, email } = useAuth();
  return (
    <>
      <div>Order</div>
      <section className="cart-component">
        <div className="cart-header">
          <h5>ID</h5>
          <h5>Name</h5>
          <h5>Subtotal</h5>
        </div>
        <hr className="upper-bar" />
        <hr />
      </section>
    </>
  );
};
