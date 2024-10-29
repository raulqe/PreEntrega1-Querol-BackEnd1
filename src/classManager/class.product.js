//General imports
import fs from "fs";
import{v4 as uuidv4}from'uuid';

export default class ProductManager{
    constructor(path){
        this.path = path;
    }

    
    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path,"utf-8");
                return (products)? JSON.parse(products):[];
            } else return [];
           
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async createProduct(object) {
        try {
            const product= {
                id: uuidv4(),
                ...object
            }
            const products = await this.getProducts();
            const productExist = products.find(p => product.name === p.name);
            if(productExist) throw new Error("product already exists");
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return product;
            
        } catch (error) {
            throw new Error(error);
        }

    }
    async getProductById (id) {
        try {
            const products = await this.getProducts();
            if(!products.length > 0) throw new Error('list products is empty');

            const product = products.find(p=> p.id === id);
            if(!product)throw new Error('product not found');

            return product;

        } catch (error) {
            throw new Error(error.message);
        }
        
    }
    async updateProduct(object, id) {
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex === -1) throw new Error('Product not found');

            products[productIndex] = { ...products[productIndex],...object };

            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return products[productIndex];
            
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async deleteProduct (id) {
        try {
            const product = await this.getProductById(id);
            const products = await this.getProducts();
            const newProduct = products.filter(p=> p.id !== id);

            await fs.promises.writeFile(this.path,JSON.stringify(newProduct));
            return product;

        } catch (error) {
            throw new Error(error);
        }
    } 
    async deleteAllProducts () {
        try {  
            const products = await this.getProducts();
            if(!products.length > 0)throw new Error('list products is empty');
            await fs.promises.unlink(this.path);
            return products;
        } catch (error) {
            throw new Error(error);
        }
    } 
      
}
