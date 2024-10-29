//General routes
import { Router } from "express";
//class Cart && Product.
import CartManager from "../classManager/class.cart.js";
import ProductManager from "../classManager/class.product.js";

const productManager= new ProductManager("./src/list.json");
const cartManager= new CartManager("./src/cartList.json");

const router= Router();

router.get('/',async (req,res)=>{
  try {
        const carts= await cartManager.getCarts();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

router.get('/:id',async (req,res)=>{
    try {
        const cart = await cartManager.getCartById(req.params.id);
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

router.post('/',async(req,res)=>{
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete('/',async(req,res)=>{
    try {
        await cartManager.deleteAllCarts();
        res.json({ message: error.message });
    } catch (error) {
        res.status(500).json({ message:error.message }); 
    }
})
router.delete('/:id',async(req,res)=>{
    try {
        const{id}=req.params;
        const cartDelete= await cartManager.deleteCart(id);
        res.status(200).json({ message:`Product id: ${cartDelete.id} deleted okey` })
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
})

router.post('/:cartId/product/:productId',async(req,res)=>{
    try {
        const { cartId, productId } = req.params;
        
        // Verifica si el carrito existe
        const cart = await cartManager.getCartById(cartId);
        if (!cart) return res.status(404).json({ error: `Cart not found` });
         
        // Verifica si el producto existe en el archivo de productos
        const product = await productManager.getProductById(productId);
        if (!product) return res.status(404).json({ error: `Product not found` });

        // Añade el producto al carrito
        const updatedCart = await cartManager.addProductToCart(cartId, productId);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
export default router;