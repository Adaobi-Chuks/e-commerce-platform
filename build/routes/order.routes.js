"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controllers_1 = __importDefault(require("../controllers/order.controllers"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const order_schemas_1 = require("../schemas/order.schemas");
const authentication_middleware_1 = __importDefault(require("../middlewares/auth/authentication.middleware"));
const router = (0, express_1.Router)();
const orderController = new order_controllers_1.default();
// Create an order
router.post("/", authentication_middleware_1.default, (0, validate_middleware_1.default)(order_schemas_1.createSchema), orderController.createOrder);
// Get all orders
router.get("/", authentication_middleware_1.default, orderController.getAllOrders);
// Get a specific order by ID
router.get("/:id", authentication_middleware_1.default, orderController.getOrderById);
// Update an order by ID
router.put("/:id", authentication_middleware_1.default, (0, validate_middleware_1.default)(order_schemas_1.editSchema), orderController.updateOrder);
// Delete an order by ID
router.delete("/:id", authentication_middleware_1.default, orderController.deleteOrder);
exports.default = router;
