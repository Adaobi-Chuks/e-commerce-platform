import { Request, Response } from "express";
import OrderService from '../services/order.services';
import ProductService from '../services/product.services';
import UserService from '../services/user.service';
import Order from "../models/order.models";
import Product from "../models/product.models";
import User from "../models/user.model";

const orderService = new OrderService(Order);
const productService = new ProductService(Product);
const userService = new UserService(User);

export default class OrderController {

    createOrder(req: Request, res: Response) {

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
                        const totalPrice = products.reduce((sum, product) => sum + (product as any).price, 0);

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

    getAllOrders(req: Request, res: Response) {
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

    getOrderById(req: Request, res: Response) {
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

    updateOrder(req: Request, res: Response) {
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

    deleteOrder(req: Request, res: Response) {
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