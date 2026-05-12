import { Router } from "express";
import Product from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const filter = {};
        if (query) {
            const [key, value] = query.split(":");
            if (key && value) filter[key] = isNaN(value) ? value : Number(value);
        }

        const sortOption = {};
        if (sort === "asc") sortOption.price = 1;
        if (sort === "desc") sortOption.price = -1;

        const result = await Product.paginate(filter, {
            page: Number(page),
            limit: Number(limit),
            sort: Object.keys(sortOption).length ? sortOption : undefined,
            lean: true
        });

        const base = `${req.protocol}://${req.get("host")}${req.baseUrl}?`;
        const prevLink = result.hasPrevPage
            ? `${base}page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`
            : null;
        const nextLink = result.hasNextPage
            ? `${base}page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`
            : null;

        res.json({
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink,
            nextLink
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error al obtener productos" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).lean();
        if (!product) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        res.json({ status: "success", payload: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error al obtener el producto" });
    }
});

export default router;
