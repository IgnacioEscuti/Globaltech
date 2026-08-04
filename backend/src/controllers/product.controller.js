import productService from "../services/product.service.js";
import { ProductDTO } from "../dto/product.dto.js";

class ProductController {
    async getAll(req, res, next) {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;
            const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}?`;

            const result = await productService.getProducts({ limit, page, sort, query, baseUrl });

            res.json({
                status: "success",
                ...result,
                payload: result.payload.map(product => new ProductDTO(product))
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const product = await productService.getProductById(req.params.id);
            res.json({ status: "success", payload: new ProductDTO(product) });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();
