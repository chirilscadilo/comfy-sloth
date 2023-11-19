import { Button, ButtonTypes } from "../button/button";
import "./orderForm.styles.scss";
import { useAuth } from "../../hooks/use-auth";
import { useEffect, useState } from "react";
import { createOrder } from "../../firebase/firebase-config";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { removeAllProducts } from "../../store/reducers/CardProductSlice";
import { ModalWindow, WindowTypes } from "../modalWindow/modalWIndw";
import { useNavigate } from "react-router-dom";

export const OrderForm = () => {
  const { displayName, email, uid } = useAuth();
  const [phone, setPhone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const pickedProducts = useAppSelector((state) => state.products);

  const totalAmount = pickedProducts.totalAmount;
  const totalSum = pickedProducts.totalSum;
  const products = pickedProducts.products;

  const dispatch = useAppDispatch();
  const remove = () => dispatch(removeAllProducts());

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setNotification(null);
      if (notification || error) navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [error, notification]);

  const handleSubmitSignUp = async (event: any) => {
    event.preventDefault();

    try {
      await createOrder({
        uid,
        displayName,
        email,
        phone,
        totalAmount,
        totalSum,
        products,
      });
      setNotification("Order sent");

      remove();
      setPhone(null);
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Account already created");
          break;
        default:
          setError(error.code);
      }
    }
  };
  return (
    <form action="" onSubmit={handleSubmitSignUp} className="finish-order-form">
      <input
        type="text"
        name="displayName"
        required
        placeholder="Name"
        value={displayName!}
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        value={email!}
      />
      <input
        type="text"
        name="phone"
        required
        placeholder="Phone"
        value={phone!}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />

      <Button buttonType="simple" type={ButtonTypes.Submit}>
        Send Order
      </Button>

      {error && (
        <ModalWindow
          text={error}
          handleClose={() => setError(null)}
          type={WindowTypes.Warning}
        ></ModalWindow>
      )}
      {notification && (
        <ModalWindow
          text={notification}
          handleClose={() => setNotification(null)}
          type={WindowTypes.Success}
        ></ModalWindow>
      )}
    </form>
  );
};
