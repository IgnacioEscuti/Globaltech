import cartRepository from "../repositories/cart.repository.js";
import { validCart, validProductInCart, validQuantity } from "../utils/errors.utils.js";

class CartService {
    createCart() {
        return cartRepository.create({ products: [] });
    }

    async getCart(cid) {
        const cart = await cartRepository.getByIdPopulated(cid);
        validCart(cart);
        return cart;
    }

    async addProduct(cid, pid) {
        const cart = await cartRepository.getById(cid);
        validCart(cart);

        const existingItem = cart.products.find(p => p.product.toString() === pid);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        return cart;
    }

    async removeProduct(cid, pid) {
        const cart = await cartRepository.getById(cid);
        validCart(cart);

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        return cart;
    }

    async updateCart(cid, products) {
        const cart = await cartRepository.update(cid, { products });
        validCart(cart);
        return cart;
    }

    async updateProductQuantity(cid, pid, quantity) {
        validQuantity(quantity);

        const cart = await cartRepository.getById(cid);
        validCart(cart);

        const item = cart.products.find(p => p.product.toString() === pid);
        validProductInCart(item);

        item.quantity = quantity;
        await cart.save();
        return cart;
    }

    async clearCart(cid) {
        const cart = await cartRepository.update(cid, { products: [] });
        validCart(cart);
        return cart;
    }
}

export default new CartService();
