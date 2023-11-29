import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductDetail.styles.scss";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { increaseProductAmount } from "../store/reducers/CardProductSlice";
import { ProductFavoriteInterface } from "../models/IProduct";
import { db } from "../firebase/firebase-config";
import { Spinner } from "../components/spinner/spinner";
import { Button } from "../components/button/button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  getProductFavorite,
  removeProductFavorite,
} from "../store/reducers/FavoriteSlice";
import { ModalWindow, WindowTypes } from "../components/modalWindow/modalWIndw";
import { collection, getDocs } from "firebase/firestore";

export const ProductDetail = () => {
  const favoriteProducts = useAppSelector(
    (state) => state.favorite.productFavorite
  );
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>([]);

  const dispatch = useAppDispatch();

  const [mainImage, setMainImage] = useState<string | null>();
  const [fisrtImage, setFirstImage] = useState(false);
  const [secondImage, setSecondImage] = useState(false);
  const [thirdImage, setThirdImage] = useState(false);
  const [forthtImage, setForthImage] = useState(false);
  const [fithImage, setFithImage] = useState(false);
  const [productAmount, setProductAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(collection(db, "products"));
      setProduct(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .find((item: ProductFavoriteInterface) => item.id === id)
      );
      setIsLoading(false);
    };

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    getProducts();
    return () => clearTimeout(timer);
  }, [notification]);

  const isFavoriteProduct = favoriteProducts.find(
    (item: ProductFavoriteInterface) => item.id === product.id
  );
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="product-section">
          <Button buttonType="simple" onClick={() => navigate(-1)}>
            Back
          </Button>
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
                    fisrtImage
                      ? { border: "3px solid #936a53" }
                      : { border: "" }
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
                    secondImage
                      ? { border: "3px solid #936a53" }
                      : { border: "" }
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
                    thirdImage
                      ? { border: "3px solid #936a53" }
                      : { border: "" }
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
                    forthtImage
                      ? { border: "3px solid #936a53" }
                      : { border: "" }
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
                {product?.company}
              </p>
              <hr />
              <div className="shopping">
                <button
                  className="minus"
                  onClick={() =>
                    setProductAmount((prevState) =>
                      prevState >= 1 ? productAmount - 1 : productAmount
                    )
                  }
                >
                  -
                </button>
                <h2 className="qty">{productAmount}</h2>
                <button
                  className="plus"
                  onClick={() =>
                    setProductAmount((prevState) =>
                      prevState >= 1 ? productAmount + 1 : productAmount
                    )
                  }
                >
                  +
                </button>
              </div>
              <div className="product-actions">
                <Button
                  buttonType="simple"
                  onClick={() => {
                    dispatch(
                      increaseProductAmount({
                        ...product!,
                        amount: productAmount >= 1 ? productAmount : 1,
                      })
                    );
                    setNotification(`${product.name} added to Cart`);
                  }}
                >
                  Add To Card
                </Button>
                {notification && (
                  <ModalWindow
                    text={notification}
                    handleClose={() => setNotification(null)}
                    type={WindowTypes.Info}
                  ></ModalWindow>
                )}
                {isFavoriteProduct ? (
                  <a
                    onClick={() =>
                      dispatch(removeProductFavorite({ id: product.id }))
                    }
                  >
                    <FavoriteIcon
                      sx={{
                        marginTop: "1rem",
                        fontSize: "30px",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  </a>
                ) : (
                  <a
                    onClick={() =>
                      dispatch(
                        getProductFavorite({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          img: product.img,
                          description: product.description,
                        })
                      )
                    }
                  >
                    <FavoriteBorderIcon
                      sx={{
                        marginTop: "1rem",
                        fontSize: "30px",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
