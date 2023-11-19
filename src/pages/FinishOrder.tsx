import { OrderForm } from "../components/orderForm/orderForm";
import "./FinishOrder.styles.scss";

export const FinishOrder = () => {
  return (
    <section className="finish-order-container">
      <h2 className="finish-order-title">Finishing your order</h2>
      <OrderForm />
    </section>
  );
};
