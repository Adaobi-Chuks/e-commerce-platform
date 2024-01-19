"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controllers_1 = __importDefault(require("../controllers/product.controllers"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const multer_config_1 = __importDefault(require("../configs/multer.config"));
const product_schemas_1 = require("../schemas/product.schemas");
const authentication_middleware_1 = __importDefault(require("../middlewares/auth/authentication.middleware"));
const router = (0, express_1.Router)();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = new product_controllers_1.default();
// Create a product
router.post("/", authentication_middleware_1.default, multer_config_1.default.single('imageUrl'), (0, validate_middleware_1.default)(product_schemas_1.createSchema), createProduct);
// Get all products
router.get("/", getAllProducts);
// Get a specific product by ID
router.get("/:id", getProductById);
// Update a product by ID
router.put("/:id", authentication_middleware_1.default, (0, validate_middleware_1.default)(product_schemas_1.editSchema), updateProduct);
// Delete a product by ID
router.delete("/:id", authentication_middleware_1.default, deleteProduct);
exports.default = router;
