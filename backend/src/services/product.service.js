import productRepository from "../repositories/product.repository.js";
import { validProduct } from "../utils/errors.utils.js";

class ProductService {
    async getProducts({ limit = 10, page = 1, sort, query, baseUrl }) {
        const filter = {};
        if (query) {
            const [key, value] = query.split(":");
            if (key && value) filter[key] = isNaN(value) ? value : Number(value);
        }

        const sortOption = {};
        if (sort === "asc") sortOption.price = 1;
        if (sort === "desc") sortOption.price = -1;

        const result = await productRepository.getPaginated(filter, {
            page: Number(page),
            limit: Number(limit),
            sort: Object.keys(sortOption).length ? sortOption : undefined,
            lean: true
        });

        const buildLink = (targetPage) =>
            `${baseUrl}page=${targetPage}&limit=${limit}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`;

        return {
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
            nextLink: result.hasNextPage ? buildLink(result.nextPage) : null
        };
    }

    async getProductById(id) {
        const product = await productRepository.getById(id);
        validProduct(product);
        return product;
    }
}

export default new ProductService();
