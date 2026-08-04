export function validProduct(product) {
    if (!product) {
        const error = new Error("producto no encontrado");
        error.statusCode = 404;
        throw error;
    }
}

export function validCart(cart) {
    if (!cart) {
        const error = new Error("carrito no encontrado");
        error.statusCode = 404;
        throw error;
    }
}

export function validProductInCart(item) {
    if (!item) {
        const error = new Error("producto no encontrado en el carrito");
        error.statusCode = 404;
        throw error;
    }
}

export function validQuantity(quantity) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
        const error = new Error("la cantidad debe ser un número entero mayor a 0");
        error.statusCode = 400;
        throw error;
    }
}
