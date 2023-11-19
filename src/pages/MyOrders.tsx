import "./MyOrders.styles.scss";
import { useAuth } from "../hooks/use-auth";
import { useEffect, useState } from "react";
import { loadOrdersByUserUid } from "../firebase/firebase-config";
import { OrdersProps } from "../models/IOrders";

export const MyOrders = () => {
  const { uid } = useAuth();
  const [orders, setOrders] = useState<any>();

  useEffect(() => {
    const getProducts = async () => {
      const loadingProductsData = await loadOrdersByUserUid(uid!);
      setOrders(loadingProductsData);
    };

    return () => {
      getProducts();
    };
  }, []);

  return (
    <>
      <h2 className="order-title">Order List</h2>
      <section className="order-component">
        <div className="order-header">
          <h5>ID</h5>
          <h5>Products</h5>
          <h5>Subtotal</h5>
        </div>
        <hr className="upper-bar" />
        <hr />
        {orders?.map((item: OrdersProps) => (
          <article className="order-content">
            <div className="order-id-container">{item?.id}</div>
            <div className="order-product-names">
              {item?.products.map((product) => (
                <p>
                  {product?.amount}x {product?.name}
                </p>
              ))}
            </div>
            <div className="order-total-price">
              {(Number(item?.totalSum) + 5.34).toFixed(2)}
            </div>
          </article>
        ))}
      </section>
    </>
  );
};
