"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_services_1 = __importDefault(require("../services/order.services"));
const product_services_1 = __importDefault(require("../services/product.services"));
const user_service_1 = __importDefault(require("../services/user.service"));
const order_models_1 = __importDefault(require("../models/order.models"));
const product_models_1 = __importDefault(require("../models/product.models"));
const user_model_1 = __importDefault(require("../models/user.model"));
const orderService = new order_services_1.default(order_models_1.default);
const productService = new product_services_1.default(product_models_1.default);
const userService = new user_service_1.default(user_model_1.default);
class OrderController {
    createOrder(req, res) {
        // Ensure that the specified user and products exist
        userService.findOne({ id: req.body.userId })
            .then(user => {
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            productService.findAll({ id: req.body.productIds })
                .then(products => {
                if (products.length !== req.body.productIds.length) {
                    return res.status(404).json({ success: false, message: 'One or more products not found' });
                }
                // Calculate total price based on product prices
                const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
                // Create the order
                const orderData = {
                    userId: req.body.userId,
                    productIds: req.body.productIds,
                    totalPrice,
                    status: 'pending',
                };
                orderService.create(orderData)
                    .then(createdOrder => {
                    res.status(201).json({ success: true, message: 'Order created successfully', order: createdOrder });
                })
                    .catch(error => {
                    console.error(error);
                    res.status(500).json({ success: false, message: 'Internal Server Error' });
                });
            })
                .catch(error => {
                console.error(error);
                res.status(500).json({ success: false, message: 'Internal Server Error' });
            });
        })
            .catch(error => {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
    }
    getAllOrders(req, res) {
        // Get all orders
        orderService.findAll({})
            .then(orders => {
            res.status(200).json({ success: true, orders });
        })
            .catch(error => {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
    }
    getOrderById(req, res) {
        const orderId = req.params.id;
        // Get a specific order by ID
        orderService.findOne({ id: orderId })
            .then(order => {
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found',
                });
            }
            res.status(200).json(order);
        })
            .catch(error => {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
    }
    updateOrder(req, res) {
        const orderId = req.params.id;
        // Update an order by ID
        orderService.update(orderId, req.body)
            .then(updatedOrder => {
            if (!updatedOrder) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Order updated successfully',
                updatedOrder,
            });
        })
            .catch(error => {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
    }
    deleteOrder(req, res) {
        const orderId = req.params.id;
        // Delete an order by ID
        orderService.delete(orderId)
            .then(deletedOrder => {
            if (!deletedOrder) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Order deleted successfully',
                deletedOrder,
            });
        })
            .catch(error => {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        });
    }
}
exports.default = OrderController;
