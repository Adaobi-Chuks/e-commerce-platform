"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../configs/database.config"));
const user_model_1 = __importDefault(require("./user.model"));
const product_models_1 = __importDefault(require("./product.models"));
const Order = database_config_1.default.define('Order', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false,
    },
}, {
    tableName: 'orders',
});
// Define association with User model
Order.belongsTo(user_model_1.default, { foreignKey: 'userId' });
// Define many-to-many association with Product model
Order.belongsToMany(product_models_1.default, {
    through: 'OrderProduct', // Adjust the through table name as needed
    foreignKey: 'orderId',
    otherKey: 'productId',
});
product_models_1.default.belongsToMany(Order, {
    through: 'OrderProduct', // Adjust the through table name as needed
    foreignKey: 'productId',
    otherKey: 'orderId',
});
exports.default = Order;
