import "./Cart.styles.scss";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  removeAllProducts,
  removeCartProductLine,
  decreaseProductAmount,
  increaseProductAmount,
} from "../store/reducers/ProductSlice";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

export const Cart = () => {
  const pickedProduct = useAppSelector((state) => state.products);
  // const totalOrderSum = useAppSelector((state) => state.products.totalSum);
  const dispatch = useAppDispatch();

  const { isAuth } = useAuth();

  const productSubtotal = (id: string) => {
    const productPrice = pickedProduct.products.find(
      (product) => product.id === id
    );
    return productPrice!.amount * productPrice!.price;
  };

  const totalOrderSum = () => {
    return pickedProduct.products
      .map((product) => product.price * product.amount)
      .reduce((accumulator, currentPrice) => accumulator + currentPrice, 0)
      .toFixed(2);
  };

  return pickedProduct.products.length > 0 ? (
    <section className="cart-component">
      <div className="cart-header">
        <h5>Item</h5>
        <h5>Price</h5>
        <h5>Quantity</h5>
        <h5>Subtotal</h5>
      </div>
      <hr className="upper-bar" />
      {pickedProduct.products.map((product) => (
        <article className="cart-content">
          <div className="product-name-container">
            <img src={product.img} alt="product image" />
            <div className="product-title">
              <p>{product.name}</p>
              <p className="product-price-small">${product.price}</p>
            </div>
          </div>
          <div className="product-price">${product.price}</div>
          <div className="product-quantity">
            <button
              className="minus"
              onClick={() => dispatch(decreaseProductAmount(product!))}
            >
              -
            </button>
            {product.amount}
            <button
              className="plus"
              onClick={() => dispatch(increaseProductAmount(product!))}
            >
              +
            </button>
          </div>
          <div className="product-total-price">
            ${productSubtotal(product.id).toFixed(2)}
          </div>
          <DeleteIcon
            sx={{
              color: "white",
              backgroundColor: "red",
              borderRadius: "5px",
              fontSize: "28px",
              margin: "8px",
              cursor: "pointer",
            }}
            className="deleteIcon"
            onClick={() => dispatch(removeCartProductLine({ id: product.id }))}
          />
        </article>
      ))}

      <hr />
      <div className="btn-container">
        <Link to="/products" className="continue-btn">
          Continue Shopping
        </Link>
        <button
          className="clear-btn"
          onClick={() => dispatch(removeAllProducts())}
        >
          Clear Shopping Cart
        </button>
      </div>

      <section className="total-card-container">
        <div>
          <article className="subtotal-shipping-container">
            <h5 className="subtotal-price">
              Subtotal
              <span>${totalOrderSum()}</span>
            </h5>
            <p className="shipping-price">
              Shipping Fee
              <span>$5.34</span>
            </p>
            <hr />

            <h4 className="total-order-price">
              Total Order
              <span>${(Number(totalOrderSum()) + 5.34).toFixed(2)}</span>
            </h4>
          </article>
          {isAuth ? (
            <button className="login-btn">Order</button>
          ) : (
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          )}
        </div>
      </section>
    </section>
  ) : (
    <div className="no-products-container">
      <h2 className="no-products-title">Your cart is Empty</h2>
      <Link to="/products" className="fill-btn">
        Fill It
      </Link>
    </div>
  );
};
