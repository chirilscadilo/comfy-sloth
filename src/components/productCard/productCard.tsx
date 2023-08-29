import "./productCard.styles.scss";
import { Link } from "react-router-dom";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  img: string;
  description: string;
  clickList: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  img,
  description,
  clickList,
}: ProductProps) => {
  if (clickList) {
    return (
      <article className="product-card-container-list">
        <Link to={`/product/${id}`}>
          <img src={img} alt={`${name}`} />
        </Link>
        <div className="footer">
          <h4>{name}</h4>
          <h5>${price}</h5>
          <p>{description.substring(0, 150)}...</p>

          <Link to={`/product/${id}`} className="btn">
            Details
          </Link>
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
          <p className="price">${price}</p>
        </div>
      </article>
    );
  }
};

export default ProductCard;
