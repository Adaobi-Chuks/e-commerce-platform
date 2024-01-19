import { DataTypes } from "sequelize";
import sequelize from "../configs/database.config";
import User from './user.model'; 
import Product from './product.models'; 

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    allowNull: false,
  },
}, {
  tableName: 'orders',
});

// Define association with User model
Order.belongsTo(User, { foreignKey: 'userId' });

// Define many-to-many association with Product model
Order.belongsToMany(Product, {
  through: 'OrderProduct', // Adjust the through table name as needed
  foreignKey: 'orderId',
  otherKey: 'productId',
});

Product.belongsToMany(Order, {
  through: 'OrderProduct', // Adjust the through table name as needed
  foreignKey: 'productId',
  otherKey: 'orderId',
});

export default Order;