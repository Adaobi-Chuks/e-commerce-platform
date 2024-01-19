"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_config_1 = __importDefault(require("../configs/cloudinary.config"));
const product_services_1 = __importDefault(require("../services/product.services"));
const product_models_1 = __importDefault(require("../models/product.models"));
const ProductModel = product_models_1.default;
// Create an instance of the ProductService class
const productService = new product_services_1.default(ProductModel);
class ProductController {
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let imageUrl;
            if (req.file) {
                // Upload file to Cloudinary
                const result = yield cloudinary_config_1.default.uploader.upload(req.file.path);
                imageUrl = result.secure_url;
                // Check if another product with the same imageUrl exists
                if (yield productService.findOne({ imageUrl })) {
                    return res.status(409).json({
                        success: false,
                        message: 'Duplicate image for the product',
                    });
                }
            }
            // Create a new product
            const createdProduct = yield productService.create(Object.assign(Object.assign({}, req.body), { imageUrl: imageUrl }));
            // Return success message
            return res.status(201).json({
                success: true,
                message: 'Product created successfully',
                createdProduct,
            });
        });
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get all products
            const products = yield productService.findAll({});
            return res.status(200).json(products);
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.id;
            // Get a specific product by ID
            const product = yield productService.findOne({ id: productId });
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found',
                });
            }
            return res.status(200).json(product);
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.id;
            // Update a product by ID
            const updatedProduct = yield productService.update(productId, req.body);
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
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.id;
            // Delete a product by ID
            const deletedProduct = yield productService.delete(productId);
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
        });
    }
}
exports.default = ProductController;
