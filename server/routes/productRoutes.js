
import express from 'express'
import {  getProductById, getProductsByCategory,getProducts} from "../controllers/productController.js"


const productRouter = express.Router()

productRouter.get("/list", getProducts)
productRouter.get("/:id", getProductById)
productRouter.get('/category/:categoryName', getProductsByCategory);


export default productRouter