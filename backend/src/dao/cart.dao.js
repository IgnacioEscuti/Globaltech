import Cart from "../models/cart.model.js";

class CartDAO {
    create(data) {
        return Cart.create(data);
    }

    findById(id) {
        return Cart.findById(id);
    }

    findByIdPopulated(id) {
        return Cart.findById(id).populate("products.product").lean();
    }

    findByIdAndUpdate(id, data) {
        return Cart.findByIdAndUpdate(id, data, { new: true }).populate("products.product");
    }
}

export default new CartDAO();
