import "./Favorite.styles.scss";
import { useAppSelector } from "../hooks/hooks";
import ProductCard from "../components/productCard/productCard";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/button/button";

export const Favorite = () => {
  let favoriteProducts = useAppSelector((state) => state.favorite);
  const navigate = useNavigate();

  const uniqueFavoriteProductsFunction =
    favoriteProducts.productFavorite.filter(
      (product, index, currentProduct) =>
        currentProduct.findIndex((product2) => product2.id === product.id) ===
        index
    );
  if (uniqueFavoriteProductsFunction.length === 0) {
    return (
      <div className="no-products-container">
        <h2 className="no-products-title">Your favorite list is Empty</h2>
        <Link to="/products">
          <Button buttonType="simple">Fill It</Button>
        </Link>
      </div>
    );
  }
  return (
    <>
      <Button buttonType="simple" onClick={() => navigate(-1)}>
        Back
      </Button>
      <h2 className="favorite-title">Favorite List</h2>
      <div className="products-container">
        {uniqueFavoriteProductsFunction.map((product) => (
          <ProductCard {...product} key={product.id} clickList={false} />
        ))}
      </div>
    </>
  );
};
