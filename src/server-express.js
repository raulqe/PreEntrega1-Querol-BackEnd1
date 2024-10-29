//General imports
import express from "express";
//Router routs
import productRouter from "./routs/products.router.js";
import cartsRouter from "./routs/carts.router.js";

const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use('/products', productRouter);
    app.use('/carts',cartsRouter);

app.listen(8080,()=>console.log('server okey express, port 8080'));

