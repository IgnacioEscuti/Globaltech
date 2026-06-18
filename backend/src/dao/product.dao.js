import Product from "../models/product.model.js";

class ProductDAO {
    paginate(filter, options) {
        return Product.paginate(filter, options);
    }

    findById(id) {
        return Product.findById(id).lean();
    }
}

export default new ProductDAO();
