import { Router } from "express";
import Cart from "../models/cart.model.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const newCart = await Cart.create({ products: [] });
        res.json({ status: "success", cartId: newCart._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error creando carrito" });
    }
});

router.post("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

        const existingItem = cart.products.find(p => p.product.toString() === pid);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.json({ status: "success", message: "Producto agregado al carrito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error agregando producto" });
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate("products.product").lean();
        if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        res.json({ status: "success", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error al obtener carrito" });
    }
});

router.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        res.json({ status: "success", message: "Producto eliminado del carrito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error eliminando producto" });
    }
});

router.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true });
        if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        res.json({ status: "success", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error actualizando carrito" });
    }
});

router.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await Cart.findById(cid);
        if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

        const item = cart.products.find(p => p.product.toString() === pid);
        if (!item) return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });

        item.quantity = quantity;
        await cart.save();
        res.json({ status: "success", message: "Cantidad actualizada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error actualizando cantidad" });
    }
});

router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findByIdAndUpdate(cid, { products: [] }, { new: true });
        if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        res.json({ status: "success", message: "Carrito vaciado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error vaciando carrito" });
    }
});

export default router;
