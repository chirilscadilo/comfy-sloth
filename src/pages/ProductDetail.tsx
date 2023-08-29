import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import productsItems from "../data/items.json";
import "./ProductDetail.styles.scss";

export const ProductDetail = () => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState<string | null>();
  const [fisrtImage, setFirstImage] = useState(false);
  const [secondImage, setSecondImage] = useState(false);
  const [thirdImage, setThirdImage] = useState(false);
  const [forthtImage, setForthImage] = useState(false);
  const [fithImage, setFithImage] = useState(false);

  const product = productsItems.find((item) => item.id === id);

  return (
    <section>
      <Link className="btn" to="/products">
        Back
      </Link>
      <div className="product-container">
        <div className="img-container">
          <img
            src={mainImage ? mainImage : product?.img}
            alt={product?.name}
            className="main-img"
          />
          <div className="extra-img">
            <img
              src={product?.img}
              alt=""
              style={
                fisrtImage ? { border: "3px solid #936a53" } : { border: "" }
              }
              onClick={() => {
                setMainImage(`${product?.img}`);
                setFirstImage(true);
                setSecondImage(false);
                setThirdImage(false);
                setForthImage(false);
                setFithImage(false);
              }}
            />
            <img
              src="/extra-product-1.jpeg"
              alt=""
              style={
                secondImage ? { border: "3px solid #936a53" } : { border: "" }
              }
              onClick={() => {
                setMainImage(`/extra-product-1.jpeg`);
                setFirstImage(false);
                setSecondImage(true);
                setThirdImage(false);
                setForthImage(false);
                setFithImage(false);
              }}
            />
            <img
              src="/extra-product-2.jpeg"
              alt=""
              style={
                thirdImage ? { border: "3px solid #936a53" } : { border: "" }
              }
              onClick={() => {
                setMainImage(`/extra-product-2.jpeg`);
                setFirstImage(false);
                setSecondImage(false);
                setThirdImage(true);
                setForthImage(false);
                setFithImage(false);
              }}
            />
            <img
              src="/extra-product-3.jpeg"
              alt=""
              style={
                forthtImage ? { border: "3px solid #936a53" } : { border: "" }
              }
              onClick={() => {
                setMainImage(`/extra-product-3.jpeg`);
                setFirstImage(false);
                setSecondImage(false);
                setThirdImage(false);
                setForthImage(true);
                setFithImage(false);
              }}
            />
            <img
              src="/extra-product-4.jpeg"
              alt=""
              style={
                fithImage ? { border: "3px solid #936a53" } : { border: "" }
              }
              onClick={() => {
                setMainImage(`/extra-product-4.jpeg`);
                setFirstImage(false);
                setSecondImage(false);
                setThirdImage(false);
                setForthImage(false);
                setFithImage(true);
              }}
            />
          </div>
        </div>

        <div className="product-details">
          <h1 className="title">{product?.name}</h1>
          <h4 className="price">${product?.price}</h4>
          <p className="description">{product?.description}</p>
          <p className="info">
            <span>Available :</span>
            In Stock
          </p>
          <p className="info">
            <span>Brand :</span>
            Liddy
          </p>
          <hr />
          <div className="shopping">
            <button className="minus">-</button>
            <h2 className="qty">1</h2>
            <button className="plus">+</button>
          </div>
          <button className="add-btn">Add To Card</button>
        </div>
      </div>
    </section>
  );
};
