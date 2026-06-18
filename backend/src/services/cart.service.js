import cartRepository from "../repositories/cart.repository.js";

class CartService {
    createCart() {
        return cartRepository.create({ products: [] });
    }

    getCart(cid) {
        return cartRepository.getByIdPopulated(cid);
    }

    async addProduct(cid, pid) {
        const cart = await cartRepository.getById(cid);
        if (!cart) return null;

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
        if (!cart) return null;

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        return cart;
    }

    updateCart(cid, products) {
        return cartRepository.update(cid, { products });
    }

    async updateProductQuantity(cid, pid, quantity) {
        const cart = await cartRepository.getById(cid);
        if (!cart) return { error: "cart" };

        const item = cart.products.find(p => p.product.toString() === pid);
        if (!item) return { error: "product" };

        item.quantity = quantity;
        await cart.save();
        return { cart };
    }

    clearCart(cid) {
        return cartRepository.update(cid, { products: [] });
    }
}

export default new CartService();
