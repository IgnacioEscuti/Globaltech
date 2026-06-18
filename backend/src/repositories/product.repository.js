import productDAO from "../dao/product.dao.js";

class ProductRepository {
    getPaginated(filter, options) {
        return productDAO.paginate(filter, options);
    }

    getById(id) {
        return productDAO.findById(id);
    }
}

export default new ProductRepository();
