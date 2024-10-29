//General imports
import fs from "fs";
import { v4 as uuidv4 } from "uuid";


export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, "utf-8");
                return carts ? JSON.parse(carts) : [];
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createCart() {
        try {
            const newCart = {
                id: uuidv4(),
                products: []
            };
            const carts = await this.getCarts();
            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return newCart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getCarts();
            if (!carts.length) throw new Error('No carts available');
            const cart = carts.find(c => c.id === id);
            if (!cart) throw new Error('Cart not found');
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex(c => c.id === cartId);
            if (cartIndex === -1) throw new Error("Cart not found");

            const productIndex = carts[cartIndex].products.findIndex(p => p.id === productId);
            if (productIndex === -1) {
                carts[cartIndex].products.push({ id: productId, quantity: 1 });
            } else {
                carts[cartIndex].products[productIndex].quantity += 1;
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return carts[cartIndex];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteCart(id) {
        try {
            const carts = await this.getCarts();
            const newCarts = carts.filter(c => c.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(newCarts, null, 2));
            return { message: "Cart deleted successfully" };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteAllCarts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify([]));
            return { message: "All carts deleted successfully" };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
