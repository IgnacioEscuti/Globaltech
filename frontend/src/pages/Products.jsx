import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../services/api.js";
import ProductCard from "../components/ProductCard.jsx";
import Pagination from "../components/Pagination.jsx";

const CATEGORIES = [
    { label: "Todos",        value: "",            icon: "🛍" },
    { label: "Electrónica",  value: "electronica", icon: "📱" },
    { label: "Computación",  value: "computacion", icon: "💻" },
    { label: "Audio",        value: "audio",       icon: "🎧" },
    { label: "Hogar",        value: "hogar",       icon: "🏠" },
    { label: "Deportes",     value: "deportes",    icon: "⚽" },
];

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts]         = useState([]);
    const [meta, setMeta]                 = useState({ page: 1, totalPages: 1, totalDocs: 0 });
    const [loading, setLoading]           = useState(true);

    const page  = Number(searchParams.get("page"))  || 1;
    const sort  = searchParams.get("sort")  || "";
    const query = searchParams.get("query") || "";

    const activeCategory = query.startsWith("category:") ? query.split(":")[1] : "";

    useEffect(() => {
        setLoading(true);
        getProducts({ page, sort: sort || undefined, query: query || undefined })
            .then(data => {
                setProducts(data.payload);
                setMeta({
                    page:       data.page,
                    totalPages: data.totalPages,
                    totalDocs:  data.totalDocs ?? data.payload.length,
                });
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [page, sort, query]);

    function setCategory(cat) {
        const params = {};
        if (cat)  params.query = `category:${cat}`;
        if (sort) params.sort  = sort;
        params.page = "1";
        setSearchParams(params);
    }

    function handleSortChange(e) {
        const params = {};
        if (query)       params.query = query;
        if (e.target.value) params.sort = e.target.value;
        params.page = "1";
        setSearchParams(params);
    }

    function handleClear() {
        setSearchParams({});
    }

    return (
        <div className="products-page">

            <div className="products-header">
                <div className="products-header-inner">
                    <h1 className="products-title">Productos</h1>
                    {!loading && (
                        <p className="products-count">
                            {products.length} resultado{products.length !== 1 ? "s" : ""}
                            {activeCategory && <span className="products-count-filter"> en <strong>{activeCategory}</strong></span>}
                        </p>
                    )}
                </div>

                <div className="products-sort">
                    <select
                        className="sort-select"
                        value={sort}
                        onChange={handleSortChange}
                    >
                        <option value="">Ordenar por</option>
                        <option value="asc">Precio: menor a mayor</option>
                        <option value="desc">Precio: mayor a menor</option>
                    </select>
                    {(sort || query) && (
                        <button className="btn btn-outline btn-sm" onClick={handleClear}>
                            Limpiar filtros
                        </button>
                    )}
                </div>
            </div>

            <div className="category-chips-bar">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.value}
                        className={`chip ${activeCategory === cat.value ? "chip-active" : ""}`}
                        onClick={() => setCategory(cat.value)}
                    >
                        <span>{cat.icon}</span> {cat.label}
                    </button>
                ))}
            </div>

            <div className="products-page-body">
                {loading ? (
                    <div className="products-loading">
                        {[...Array(8)].map((_, i) => <div key={i} className="product-skeleton" />)}
                    </div>
                ) : products.length === 0 ? (
                    <div className="products-empty">
                        <span className="products-empty-icon">🔍</span>
                        <p>No encontramos productos con ese filtro.</p>
                        <button className="btn" onClick={handleClear}>Ver todos</button>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

                <Pagination
                    page={meta.page}
                    totalPages={meta.totalPages}
                    onPrev={() => setSearchParams({ page: meta.page - 1, ...(sort && { sort }), ...(query && { query }) })}
                    onNext={() => setSearchParams({ page: meta.page + 1, ...(sort && { sort }), ...(query && { query }) })}
                />
            </div>
        </div>
    );
}
