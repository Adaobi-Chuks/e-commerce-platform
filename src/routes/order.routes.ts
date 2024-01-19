import { Router } from "express";
import OrderController from '../controllers/order.controllers';
import validate from "../middlewares/validate.middleware";
import { createSchema, editSchema } from "../schemas/order.schemas";
import authenticate from "../middlewares/auth/authentication.middleware";

const router = Router();
const orderController = new OrderController();

// Create an order
router.post("/", authenticate,  validate(createSchema), orderController.createOrder);

// Get all orders
router.get("/", authenticate,  orderController.getAllOrders);

// Get a specific order by ID
router.get("/:id", authenticate,  orderController.getOrderById);

// Update an order by ID
router.put("/:id", authenticate,  validate(editSchema), orderController.updateOrder);

// Delete an order by ID
router.delete("/:id", authenticate,  orderController.deleteOrder);

export default router;