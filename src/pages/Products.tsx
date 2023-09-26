import { useState } from "react";
import productsItems from "../data/items.json";
import ProductCard from "../components/productCard/productCard";
import "./Products.styles.scss";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AppsIcon from "@mui/icons-material/Apps";

export function Products() {
  const [clickGrid, setClickGrid] = useState(true);
  const [clickList, setClickList] = useState(false);
  const [productSort, setProductSort] = useState("lowest");
  const [searchValue, setSearchValue] = useState<string | undefined>("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>("");
  const [companyFilter, setCompanyFilter] = useState<string | null>("");
  const [price, setPrice] = useState<any | null>(1000);

  const filteredProducts = productsItems.filter((product) => {
    if (
      searchValue &&
      !product.name.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return false;
    }
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }

    if (companyFilter && product.company !== companyFilter) {
      return false;
    }

    if (price && product.price >= price) {
      return false;
    }

    return true;
  });

  const GridDisplayProducts = () => {
    setClickGrid(true);
    setClickList(false);
  };
  const ListDisplayProducts = () => {
    setClickGrid(false);
    setClickList(true);
  };

  return (
    <div className="products-filter-container">
      <form className="filter-container">
        <input
          type="text"
          name="text"
          placeholder="Search"
          className="search-input"
          value={searchValue || ""}
          onChange={(e) => {
            setSearchValue(e.target.value || undefined);
          }}
        />

        <div className="category-filter">
          <h5 className="category-title">Category</h5>
          <select
            name=""
            id=""
            value={categoryFilter || ""}
            onChange={(e) => {
              setCategoryFilter(e.target.value || null);
            }}
            className="category-option"
          >
            <option value="">All</option>
            <option value="Office">Office</option>
            <option value="Living Room">Living Room</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Dining">Dining</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="company-filter">
          <h5 className="title">Company</h5>
          <select
            name="company"
            value={companyFilter || ""}
            onChange={(e) => {
              setCompanyFilter(e.target.value || null);
            }}
            className="company-option"
          >
            <option value="">All</option>
            <option value="Marcos">Marcos</option>
            <option value="Ikea">Ikea</option>
            <option value="Liddy">Liddy</option>
          </select>
        </div>

        <div className="price-range">
          <h5 className="title-price">Price</h5>
          <label htmlFor="price" className="price">
            ${price}
          </label>
          <input
            type="range"
            id="price"
            name="price"
            min={0}
            max={1000}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>

        <button
          type="button"
          className="clear-btn"
          onClick={() => {
            setSearchValue("");
            setCompanyFilter("");
            setCategoryFilter("");
            setPrice(1000);
          }}
        >
          Clear Filters
        </button>
      </form>

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
            {filteredProducts.length} Products Found
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
            ? filteredProducts
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
            ? filteredProducts
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
            ? filteredProducts
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
            : filteredProducts
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
