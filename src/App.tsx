import "./App.styles.scss";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { About } from "./pages/About";
import { Navbar } from "./components/navbar/Navbar";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { LogIn } from "./pages/LogIn";
import { Register } from "./pages/Register";
import { LogOut } from "./pages/logOut";
import { Favorite } from "./pages/Favorite";
import { Footer } from "./components/footer/footer";
import { MyOrders } from "./pages/MyOrders";
import { FinishOrder } from "./pages/FinishOrder";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logOut" element={<LogOut />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/orderform" element={<FinishOrder />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
