import { Button } from "../button/button";
import "./productCard.styles.scss";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getProductFavorite,
  removeProductFavorite,
} from "../../store/reducers/FavoriteSlice";
import { ProductFavoriteInterface } from "../../models/IProduct";

interface ProductProps {
  id?: string | undefined;
  name?: string | undefined;
  price?: number | undefined;
  img?: string | undefined;
  description?: string | undefined;
  clickList?: boolean | undefined;
}

const ProductCard = ({
  id,
  name,
  price,
  img,
  description,
  clickList,
}: ProductProps) => {
  const dispatch = useAppDispatch();
  const favoriteProducts = useAppSelector(
    (state) => state.favorite.productFavorite
  );

  const isFavoriteProduct = favoriteProducts.find(
    (item: ProductFavoriteInterface) => item.id === id
  );
  if (clickList) {
    return (
      <article className="product-card-container-list">
        <Link to={`/product/${id}`}>
          <img src={img} alt={`${name}`} />
        </Link>
        <div className="footer">
          <h4>{name}</h4>
          <h5>${price}</h5>
          <p>{description?.substring(0, 150)}...</p>

          <div className="product-actions">
            <Link to={`/product/${id}`}>
              <Button buttonType="simple">Details</Button>
            </Link>

            {isFavoriteProduct ? (
              <a onClick={() => dispatch(removeProductFavorite({ id }))}>
                <FavoriteIcon sx={{ marginTop: "1rem", fontSize: "30px" }} />
              </a>
            ) : (
              <a
                onClick={() =>
                  dispatch(
                    getProductFavorite({ id, name, price, img, description })
                  )
                }
              >
                <FavoriteBorderIcon
                  sx={{ marginTop: "1rem", fontSize: "30px" }}
                />
              </a>
            )}
          </div>
        </div>
      </article>
    );
  } else {
    return (
      <article className="product-card-container">
        <Link to={`/product/${id}`}>
          <img src={img} alt={`${name}`} />
        </Link>
        <div className="footer">
          <p>{name}</p>
          {isFavoriteProduct ? (
            <a onClick={() => dispatch(removeProductFavorite({ id }))}>
              <FavoriteIcon />
            </a>
          ) : (
            <a
              onClick={() =>
                dispatch(
                  getProductFavorite({ id, name, price, img, description })
                )
              }
            >
              <FavoriteBorderIcon />
            </a>
          )}

          <p className="price">${price}</p>
        </div>
      </article>
    );
  }
};

export default ProductCard;
