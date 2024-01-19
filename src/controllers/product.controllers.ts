import { Request, Response } from "express";
import cloudinary from "../configs/cloudinary.config";
import ProductService from "../services/product.services"; 
import Product from '../models/product.models';
const ProductModel = Product;
// Create an instance of the ProductService class
const productService = new ProductService(ProductModel);

export default class ProductController {
    async createProduct(req: Request, res: Response) {
        let imageUrl;
        if (req.file) {
            // Upload file to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
            
            // Check if another product with the same imageUrl exists
            if (await productService.findOne({ imageUrl })) {
                return res.status(409).json({
                    success: false,
                    message: 'Duplicate image for the product',
                });
            }
        }

        // Create a new product
        const createdProduct = await productService.create({
            ...req.body,
            imageUrl: imageUrl,
        });

        // Return success message
        return res.status(201).json({
            success: true,
            message: 'Product created successfully',
            createdProduct,
        });
    }

    async getAllProducts(req: Request, res: Response) {
        // Get all products
        const products = await productService.findAll({});
        return res.status(200).json(products);
    }

    async getProductById(req: Request, res: Response) {
        const productId = req.params.id;

        // Get a specific product by ID
        const product = await productService.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        return res.status(200).json(product);
    }

    async updateProduct(req: Request, res: Response) {
        const productId = req.params.id;

        // Update a product by ID
        const updatedProduct = await productService.update(productId, req.body);

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            updatedProduct,
        });
    }

    async deleteProduct(req: Request, res: Response) {
        const productId = req.params.id;

        // Delete a product by ID
        const deletedProduct = await productService.delete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            deletedProduct,
        });
    }
}