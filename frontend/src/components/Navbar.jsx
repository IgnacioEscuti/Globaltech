import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
    const { cartCount, setSidebarOpen } = useCart();

    return (
        <nav className="navbar">
            <div className="nav-inner">
                <Link to="/" className="nav-brand">Globaltech</Link>
                <div className="nav-links">
                    <Link to="/">Inicio</Link>
                    <Link to="/products">Productos</Link>
                </div>
                <button className="cart-btn" onClick={() => setSidebarOpen(true)} aria-label="Abrir carrito">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </button>
            </div>
        </nav>
    );
}
