import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import Navbar from "./components/Navbar.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";

export default function App() {
    return (
        <CartProvider>
            <Navbar />
            <CartSidebar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:pid" element={<ProductDetail />} />
                <Route path="/carts/:cid" element={<Cart />} />
            </Routes>
        </CartProvider>
    );
}
