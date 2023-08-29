import { useState, useEffect } from "react";
import productsItems from "../data/items.json";
import ProductCard from "../components/productCard/productCard";
import "./Products.styles.scss";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AppsIcon from "@mui/icons-material/Apps";

export function Products() {
  const [clickGrid, setClickGrid] = useState(true);
  const [clickList, setClickList] = useState(false);
  const [productSort, setProductSort] = useState("lowest");

  const GridDisplayProducts = () => {
    setClickGrid(true);
    setClickList(false);
  };
  const ListDisplayProducts = () => {
    setClickGrid(false);
    setClickList(true);
  };

  const renderSwitch = (productSort: string) => {
    switch (productSort) {
      case "higher":
        productsItems.sort((a, b) => {
          return b.price - a.price;
        });
      case "alphabetic":
        productsItems.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      case "non-alphabetic":
        productsItems.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      default:
        productsItems.sort((a, b) => {
          return a.price - b.price;
        });
    }
  };

  return (
    <div className="products-filter-container">
      <section className="filter-container">Filter Column</section>

      <section className="sorting-products-container">
        <div className="sorting-type">
          <div className="sorting-buttons">
            <a onClick={GridDisplayProducts}>
              <AppsIcon
                sx={{
                  cursor: "pointer",
                  fontSize: "28px",
                  color: clickGrid ? "black" : "grey",
                }}
              />
            </a>

            <a onClick={ListDisplayProducts}>
              <ListAltIcon
                sx={{
                  cursor: "pointer",
                  fontSize: "28px",
                  color: clickList ? "black" : "grey",
                }}
              />
            </a>
          </div>
          <p className="products-found">
            {productsItems.length} Products Found
          </p>
          <hr />
          <form className="sort-form">
            <label htmlFor="sort">Sort By</label>
            <select
              value={productSort}
              onChange={(e) => {
                setProductSort(e.target.value);
              }}
            >
              <option value="lowest">Price (Lowest)</option>
              <option value="higher">Price (Higher)</option>
              <option value="alphabetic">Name (A-Z)</option>
              <option value="non-alphabetic">Name (Z-A)</option>
            </select>
          </form>
        </div>

        <div
          className={
            clickList ? "products-container-list" : "products-container"
          }
        >
          {productSort === "lowest"
            ? productsItems
                .sort((a, b) => {
                  return a.price - b.price;
                })
                .map((product) => (
                  <ProductCard
                    {...product}
                    key={product.id}
                    clickList={clickList}
                  />
                ))
            : productSort === "higher"
            ? productsItems
                .sort((a, b) => {
                  return b.price - a.price;
                })
                .map((product) => (
                  <ProductCard
                    {...product}
                    key={product.id}
                    clickList={clickList}
                  />
                ))
            : productSort === "alphabetic"
            ? productsItems
                .sort((a, b) => {
                  return a.name.localeCompare(b.name);
                })
                .map((product) => (
                  <ProductCard
                    {...product}
                    key={product.id}
                    clickList={clickList}
                  />
                ))
            : productsItems
                .sort((a, b) => {
                  return b.name.localeCompare(a.name);
                })
                .map((product) => (
                  <ProductCard
                    {...product}
                    key={product.id}
                    clickList={clickList}
                  />
                ))}
        </div>
      </section>
    </div>
  );
}
