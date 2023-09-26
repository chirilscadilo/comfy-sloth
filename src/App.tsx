import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { About } from "./pages/About";
import { Navbar } from "./components/navbar/Navbar";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
function App() {
  return (
    <>
      <Container>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
