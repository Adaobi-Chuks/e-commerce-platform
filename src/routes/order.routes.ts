import { Router } from "express";
import OrderController from '../controllers/order.controllers';
import validate from "../middlewares/validate.middleware";
import { createSchema, editSchema } from "../schemas/order.schemas";

const router = Router();
const orderController = new OrderController();

// Create an order
router.post("/", validate(createSchema), orderController.createOrder);

// Get all orders
router.get("/", orderController.getAllOrders);

// Get a specific order by ID
router.get("/:id", orderController.getOrderById);

// Update an order by ID
router.put("/:id", validate(editSchema), orderController.updateOrder);

// Delete an order by ID
router.delete("/:id", orderController.deleteOrder);

export default router;