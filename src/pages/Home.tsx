import { Button } from "../components/button/button";
import "./Home.styles.scss";
import ProductCard from "../components/productCard/productCard";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import { Product } from "../models/IProduct";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

export function Home() {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(collection(db, "products"));
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);

  const slicedProducts = products.slice(0, 3);
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="home-text">
          <h2 className="title">
            Design Your <br /> Comfort Zone
          </h2>
          <article className="article">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
            sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
            aperiam odio ducimus, obcaecati libero et quia tempora excepturi
            quis alias?
          </article>
          <Link to="/products">
            <Button buttonType="simple">Shop Now</Button>
          </Link>
        </div>
        <img src="about.jpeg" alt="home-photo" />
      </section>

      <section className="featured-products">
        <h2 className="featured-title">Featured Products</h2>
        <div className="featured-products-list">
          {slicedProducts.map((product: Product) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
        <div className="all-products-btn">
          <Link to="/products">
            <Button buttonType="simple">All Products</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
