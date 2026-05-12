export async function getProducts({ limit = 10, page = 1, sort, query } = {}) {
    const params = new URLSearchParams({ limit, page });
    if (sort) params.set("sort", sort);
    if (query) params.set("query", query);
    const res = await fetch(`/api/products?${params}`);
    if (!res.ok) throw new Error("Error al obtener productos");
    return res.json();
}

export async function getProductById(id) {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error("Producto no encontrado");
    return res.json();
}

export async function getCart(cartId) {
    const res = await fetch(`/api/carts/${cartId}`);
    if (!res.ok) throw new Error("Error al obtener carrito");
    return res.json();
}
