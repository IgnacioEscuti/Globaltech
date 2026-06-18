import productService from "../services/product.service.js";

class ProductController {
    async getAll(req, res) {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;
            const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}?`;

            const result = await productService.getProducts({ limit, page, sort, query, baseUrl });

            res.json({ status: "success", ...result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Error al obtener productos" });
        }
    }

    async getById(req, res) {
        try {
            const product = await productService.getProductById(req.params.id);
            if (!product) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
            res.json({ status: "success", payload: product });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Error al obtener el producto" });
        }
    }
}

export default new ProductController();
