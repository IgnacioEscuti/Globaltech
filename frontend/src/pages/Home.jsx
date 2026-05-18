import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api.js";
import ProductCard from "../components/ProductCard.jsx";

const CATEGORIES = [
    { label: "Electrónica",  value: "electronica", icon: "📱" },
    { label: "Computación",  value: "computacion", icon: "💻" },
    { label: "Audio",        value: "audio",        icon: "🎧" },
    { label: "Hogar",        value: "hogar",        icon: "🏠" },
    { label: "Deportes",     value: "deportes",     icon: "⚽" },
];

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts({ limit: 8 })
            .then(data => setProducts(data.payload))
            .catch(console.error);
    }, []);

    return (
        <>
            <section className="hero">
                <p className="hero-eyebrow">Nueva colección 2026</p>
                <h1>Tecnología que<br /><span className="hero-highlight">te inspira</span></h1>
                <p className="hero-sub">
                    Explorá nuestra selección de productos con los mejores precios del mercado. Calidad garantizada.
                </p>
                <div className="hero-actions">
                    <Link to="/products" className="btn">Ver todos los productos</Link>
                    <Link to="/products?sort=asc" className="btn btn-outline">Mejores precios</Link>
                </div>
            </section>

            <div className="container">
                <div className="banners">
                    <Link to="/products?query=category:computacion" className="banner banner-1">
                        <span className="banner-icon">💻</span>
                        <p className="banner-eyebrow">Lo más nuevo</p>
                        <h3>Computación de última generación</h3>
                        <span className="btn btn-sm" style={{ width: "fit-content" }}>Explorar →</span>
                    </Link>
                    <Link to="/products?sort=desc" className="banner banner-2">
                        <span className="banner-icon">⭐</span>
                        <p className="banner-eyebrow">Top ventas</p>
                        <h3>Los productos más destacados</h3>
                        <span className="btn btn-sm" style={{ width: "fit-content" }}>Ver más →</span>
                    </Link>
                </div>

                <div className="stats">
                    <div className="stat">
                        <span className="stat-number">+500</span>
                        <p className="stat-label">Productos disponibles</p>
                    </div>
                    <div className="stat">
                        <span className="stat-number">24/7</span>
                        <p className="stat-label">Soporte al cliente</p>
                    </div>
                    <div className="stat">
                        <span className="stat-number">100%</span>
                        <p className="stat-label">Compra segura</p>
                    </div>
                </div>

                <p className="section-label">Categorías</p>
                <p className="section-title">Explorá por categoría</p>
                <div className="categories">
                    {CATEGORIES.map(cat => (
                        <Link
                            key={cat.value}
                            to={`/products?query=category:${cat.value}`}
                            className="category-card"
                        >
                            <div className="category-icon">{cat.icon}</div>
                            <p className="category-name">{cat.label}</p>
                        </Link>
                    ))}
                    <Link to="/products?sort=asc" className="category-card">
                        <div className="category-icon">🔥</div>
                        <p className="category-name">Mejores precios</p>
                    </Link>
                </div>

                <p className="section-label">Destacados</p>
                <p className="section-title">Productos populares</p>
                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
}
