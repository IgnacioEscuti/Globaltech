import cartService from "../services/cart.service.js";

class CartController {
    async create(req, res) {
        try {
            const newCart = await cartService.createCart();
            res.json({ status: "success", cartId: newCart._id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Error creando carrito" });
        }
    }

    async addProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const cart = await cartService.addProduct(cid, pid);
            if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
            res.json({ status: "success", message: "Producto agregado al carrito" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Error agregando producto" });
        }
    }

    async getById(req, res) {
        try {
            const cart = await cartService.getCart(req.params.cid);
            if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
            res.json({ status: "success", cart });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Error al obtener carrito" });
        }
    }

    async removeProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const cart = await cartService.removeProduct(cid, pid);
            if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
            res.json({ status: "success", message: "Producto eliminado del carrito" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Error eliminando producto" });
        }
    }

    async update(req, res) {
        try {
            const { cid } = req.params;
            const { products } = req.body;
            const cart = await cartService.updateCart(cid, products);
            if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
            res.json({ status: "success", cart });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Error actualizando carrito" });
        }
    }

    async updateProductQuantity(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const result = await cartService.updateProductQuantity(cid, pid, quantity);

            if (result.error === "cart") return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
            if (result.error === "product") return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });

            res.json({ status: "success", message: "Cantidad actualizada" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Error actualizando cantidad" });
        }
    }

    async clear(req, res) {
        try {
            const cart = await cartService.clearCart(req.params.cid);
            if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
            res.json({ status: "success", message: "Carrito vaciado" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Error vaciando carrito" });
        }
    }
}

export default new CartController();
