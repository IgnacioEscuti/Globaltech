import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
    const [cart, setCart] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    async function getCartId() {
        if (cartId) return cartId;
        const res = await fetch("/api/carts", { method: "POST" });
        const data = await res.json();
        localStorage.setItem("cartId", data.cartId);
        setCartId(data.cartId);
        return data.cartId;
    }

    const refreshCart = useCallback(async () => {
        try {
            const id = cartId || await getCartId();
            const res = await fetch(`/api/carts/${id}`);
            const data = await res.json();
            setCart(data.cart);
            const count = data.cart.products.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(count);
        } catch (_) {}
    }, [cartId]);

    async function addToCart(productId) {
        const id = await getCartId();
        const res = await fetch(`/api/carts/${id}/products/${productId}`, { method: "POST" });
        if (res.ok) await refreshCart();
        return res.ok;
    }

    async function removeFromCart(productId) {
        if (!cartId) return;
        const res = await fetch(`/api/carts/${cartId}/products/${productId}`, { method: "DELETE" });
        if (res.ok) await refreshCart();
    }

    useEffect(() => {
        if (cartId) refreshCart();
    }, [cartId, refreshCart]);

    return (
        <CartContext.Provider value={{
            cartId, cart, cartCount, sidebarOpen,
            setSidebarOpen, addToCart, removeFromCart, refreshCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
