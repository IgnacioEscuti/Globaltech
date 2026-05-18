import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCart } from "../services/api.js";

export default function Cart() {
    const { cid } = useParams();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCart(cid)
            .then(data => setCart(data.cart))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [cid]);

    if (loading) {
        return <p style={{ textAlign: "center", padding: "6rem", color: "var(--text-muted)" }}>Cargando carrito…</p>;
    }

    if (!cart?.products?.length) {
        return (
            <div className="container" style={{ maxWidth: "500px" }}>
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛍</div>
                    <p>Tu carrito está vacío.<br />¡Agregá productos para empezar!</p>
                    <Link to="/products" className="btn">Ver productos</Link>
                </div>
            </div>
        );
    }

    const total = cart.products.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    );

    return (
        <>
            <div className="cart-page-header">
                <h1>Tu carrito</h1>
                <p className="cart-page-subtitle">{cart.products.length} producto(s)</p>
            </div>

            <div className="cart-page">
                <div>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.products.map(item => (
                                <tr key={item.product._id}>
                                    <td>
                                        <strong>{item.product.title}</strong><br />
                                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                                            {item.product.category}
                                        </span>
                                    </td>
                                    <td>${item.product.price.toLocaleString()}</td>
                                    <td>{item.quantity}</td>
                                    <td><strong>${(item.product.price * item.quantity).toLocaleString()}</strong></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="cart-summary">
                    <h3>Resumen del pedido</h3>
                    {cart.products.map(item => (
                        <div key={item.product._id} className="summary-row">
                            <span style={{ fontSize: "0.82rem" }}>
                                {item.product.title} ×{item.quantity}
                            </span>
                            <span>${(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                    <div className="summary-total">
                        <span>Total</span>
                        <span>${total.toLocaleString()}</span>
                    </div>
                    <Link to="/products" className="btn btn-full">Seguir comprando</Link>
                </div>
            </div>
        </>
    );
}
