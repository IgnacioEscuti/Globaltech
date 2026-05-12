import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartSidebar() {
    const { sidebarOpen, setSidebarOpen, cart, cartId, removeFromCart } = useCart();

    // Bloquear scroll del body cuando el sidebar está abierto
    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [sidebarOpen]);

    const total = cart?.products?.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    ) ?? 0;

    return (
        <>
            <div
                className={`cart-overlay ${sidebarOpen ? "open" : ""}`}
                onClick={() => setSidebarOpen(false)}
            />
            <aside className={`cart-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="cart-sidebar-header">
                    <h2>Tu carrito</h2>
                    <button className="close-cart" onClick={() => setSidebarOpen(false)}>✕</button>
                </div>

                <div className="cart-sidebar-body">
                    {!cart?.products?.length ? (
                        <div className="cart-empty">
                            <div className="cart-empty-icon">🛍</div>
                            <p>Tu carrito está vacío</p>
                            <Link to="/products" className="btn btn-sm" onClick={() => setSidebarOpen(false)}>
                                Ver productos
                            </Link>
                        </div>
                    ) : (
                        cart.products.map(item => (
                            <div key={item.product._id} className="cart-item">
                                <div className="cart-item-info">
                                    <p className="cart-item-name">{item.product.title}</p>
                                    <p className="cart-item-price">${item.product.price} × {item.quantity}</p>
                                    <button
                                        className="remove-from-cart"
                                        onClick={() => removeFromCart(item.product._id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                                <span className="cart-item-subtotal">
                                    ${(item.product.price * item.quantity).toLocaleString()}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                {cart?.products?.length > 0 && (
                    <div className="cart-sidebar-footer">
                        <div className="cart-total">
                            <span>Total</span>
                            <span>${total.toLocaleString()}</span>
                        </div>
                        <Link
                            to={`/carts/${cartId}`}
                            className="btn btn-full"
                            onClick={() => setSidebarOpen(false)}
                        >
                            Ver carrito completo
                        </Link>
                    </div>
                )}
            </aside>
        </>
    );
}
