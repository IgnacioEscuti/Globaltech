import { ProductDTO } from "./product.dto.js";

export class CartDTO {
    constructor(cart) {
        this._id = cart._id;
        this.products = cart.products.map(item => ({
            product: new ProductDTO(item.product),
            quantity: item.quantity
        }));
    }
}
