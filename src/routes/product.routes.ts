import { Router } from "express";
import ProductController from '../controllers/product.controllers';
import validate from "../middlewares/validate.middleware";
import upload from "../configs/multer.config"; 
import { createSchema, editSchema } from "../schemas/product.schemas";
const router = Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = new ProductController();

// Create a product
router.post("/", upload.single('imageUrl'), validate(createSchema), createProduct);

// Get all products
router.get("/", getAllProducts);

// Get a specific product by ID
router.get("/:id", getProductById);

// Update a product by ID
router.put("/:id", validate(editSchema), updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

export default router;
