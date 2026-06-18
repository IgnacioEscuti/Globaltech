import cartDAO from "../dao/cart.dao.js";

class CartRepository {
    create(data) {
        return cartDAO.create(data);
    }

    getById(id) {
        return cartDAO.findById(id);
    }

    getByIdPopulated(id) {
        return cartDAO.findByIdPopulated(id);
    }

    update(id, data) {
        return cartDAO.findByIdAndUpdate(id, data);
    }
}

export default new CartRepository();
