import { Model } from 'sequelize';
import { ServiceInterface } from '../interfaces/service.interface';
import Order from '../models/order.models'; 

export default class OrderService implements ServiceInterface<Model> {
    private readonly orderModel: typeof Order;

    constructor(orderModel: typeof Order) {
        this.orderModel = orderModel;
    }

    async create(data: any): Promise<Model> {
        const order = await this.orderModel.create(data);
        return order;
    }

    async update(id: string, data: any): Promise<Model | null> {
        const [numUpdated, updatedOrders] = await this.orderModel.update(data, {
            where: { id },
            returning: true,
        });

        if (numUpdated === 0) {
            return null;
        }

        return updatedOrders[0];
    }

    async delete(id: string): Promise<Model | null> {
        const deletedRows = await this.orderModel.destroy({ where: { id } });

        if (deletedRows === 0) {
            return null;
        }

        return await this.orderModel.findByPk(id);
    }

    async findOne(filter: any): Promise<Model | null> {
        const order = await this.orderModel.findOne({ where: filter });
        return order;
    }

    async findAll(filter: any): Promise<Model[]> {
        const orders = await this.orderModel.findAll({ where: filter });
        return orders;
    }
}