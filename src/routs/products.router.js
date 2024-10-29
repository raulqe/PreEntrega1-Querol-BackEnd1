//General imports
import { Router } from "express";
//Class Product
import ProductManager from "../classManager/class.product.js";
//midelwares
import {productValidator} from "../midelwares/product.validator.js";

const productManager= new ProductManager("./src/list.json");

const router= Router();

   router.get('/',async(req,res)=>{
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message}); 
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const { id }=req.params;
        const product = await productManager.getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({message:error.message}); 
    }
})
router.post('/',[productValidator],async(req,res)=>{
    try {
        const product=await productManager.createProduct(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message:error.message }); 
    }
})
router.delete('/',async(req,res)=>{
    try {
        await productManager.deleteAllProducts();
        res.json({ message: error.message });
    } catch (error) {
        res.status(500).json({ message:error.message }); 
    }
})
router.delete('/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        const productDelete= await productManager.deleteProduct(id);
        res.status(200).json({ message:`Product id: ${productDelete.id} deleted okey` })
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
})

router.put('/:id',async(req,res)=>{
    try {
        const{id}=req.params;
        const productUpdate = await productManager.updateProduct(req.body,id);
        res.status(200).json({ name:productUpdate.name,price:productUpdate.price });
    } catch (error) {
        res.status(500).json({ msg:error.message }); 
    }
})

export default router;