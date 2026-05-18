import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/api.js";
import { useCart } from "../context/CartContext.jsx";
import { categoryIcon } from "../utils/categoryIcon.js";

export default function ProductDetail() {
    const { pid } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        getProductById(pid)
            .then(data => setProduct(data.payload))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [pid]);

    async function handleAdd() {
        setAdding(true);
        const ok = await addToCart(product._id);
        setAdding(false);
        if (ok) {
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    }

    if (loading) {
        return <p style={{ textAlign: "center", padding: "6rem", color: "var(--text-muted)" }}>Cargando…</p>;
    }

    if (!product) {
        return (
            <div className="container" style={{ textAlign: "center", paddingTop: "4rem" }}>
                <p>Producto no encontrado.</p>
                <Link to="/products" className="btn" style={{ marginTop: "1rem" }}>Volver</Link>
            </div>
        );
    }

    return (
        <>
            <Link to="/products" className="back-link">← Volver a productos</Link>

            <div className="product-detail-page">
                <div className="product-image-box">
                    {categoryIcon(product.category)}
                </div>

                <div className="product-detail-info">
                    <span className="category-badge">{product.category}</span>
                    <h1>{product.title}</h1>
                    <p className="detail-price">${product.price.toLocaleString()}</p>

                    <div className="divider" />

                    <p className="description">{product.description}</p>

                    <div className="divider" />

                    {product.stock > 0 ? (
                        <p className="stock-badge">
                            <span className="stock-dot" />
                            {product.stock} unidades en stock
                        </p>
                    ) : (
                        <p className="stock-badge" style={{ color: "#e74c3c" }}>
                            <span className="stock-dot" style={{ background: "#e74c3c" }} />
                            Sin stock disponible
                        </p>
                    )}

                    <div className="detail-actions">
                        <button
                            className="btn"
                            onClick={handleAdd}
                            disabled={adding || added || !product.stock}
                        >
                            {adding ? "Agregando…" : added ? "✓ Agregado al carrito" : "Agregar al carrito"}
                        </button>
                    </div>

                    <div style={{ background: "var(--bg)", borderRadius: "12px", padding: "1.25rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        <p style={{ marginBottom: "0.4rem" }}>✓ &nbsp;Envío gratis a todo el país</p>
                        <p style={{ marginBottom: "0.4rem" }}>✓ &nbsp;Devoluciones sin cargo en 30 días</p>
                        <p>✓ &nbsp;Pago seguro garantizado</p>
                    </div>
                </div>
            </div>
        </>
    );
}
