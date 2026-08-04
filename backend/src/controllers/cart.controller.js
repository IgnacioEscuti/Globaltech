import cartService from "../services/cart.service.js";
import { CartDTO } from "../dto/cart.dto.js";

class CartController {
    async create(req, res, next) {
        try {
            const newCart = await cartService.createCart();
            res.json({ status: "success", cartId: newCart._id });
        } catch (error) {
            next(error);
        }
    }

    async addProduct(req, res, next) {
        try {
            const { cid, pid } = req.params;
            await cartService.addProduct(cid, pid);
            res.json({ status: "success", message: "Producto agregado al carrito" });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const cart = await cartService.getCart(req.params.cid);
            res.json({ status: "success", cart: new CartDTO(cart) });
        } catch (error) {
            next(error);
        }
    }

    async removeProduct(req, res, next) {
        try {
            const { cid, pid } = req.params;
            await cartService.removeProduct(cid, pid);
            res.json({ status: "success", message: "Producto eliminado del carrito" });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { cid } = req.params;
            const { products } = req.body;
            const cart = await cartService.updateCart(cid, products);
            res.json({ status: "success", cart: new CartDTO(cart) });
        } catch (error) {
            next(error);
        }
    }

    async updateProductQuantity(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            await cartService.updateProductQuantity(cid, pid, quantity);
            res.json({ status: "success", message: "Cantidad actualizada" });
        } catch (error) {
            next(error);
        }
    }

    async clear(req, res, next) {
        try {
            await cartService.clearCart(req.params.cid);
            res.json({ status: "success", message: "Carrito vaciado" });
        } catch (error) {
            next(error);
        }
    }
}

export default new CartController();
