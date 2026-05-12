import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { categoryIcon } from "../utils/categoryIcon.js";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);

    async function handleAdd() {
        setLoading(true);
        const ok = await addToCart(product._id);
        setLoading(false);
        if (ok) {
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
        }
    }

    return (
        <div className="product-card">
            <div className="product-thumb">{categoryIcon(product.category)}</div>
            <h3>{product.title}</h3>
            <span className="category-badge">{product.category}</span>
            <p className="price">${product.price.toLocaleString()}</p>
            <div className="card-actions">
                <button
                    className="btn btn-sm add-to-cart"
                    onClick={handleAdd}
                    disabled={loading || added}
                >
                    {loading ? "Agregando…" : added ? "✓ Agregado" : "Agregar"}
                </button>
                <Link to={`/products/${product._id}`} className="btn btn-sm btn-outline">
                    Ver más
                </Link>
            </div>
        </div>
    );
}
