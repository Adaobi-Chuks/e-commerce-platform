import { Model } from 'sequelize';
import { ServiceInterface } from '../interfaces/service.interface';
import Product from '../models/product.models';

export default class ProductService implements ServiceInterface<Model> {
    private readonly productModel: typeof Product;

    constructor(productModel: typeof Product) {
        this.productModel = productModel;
    }

    async create(data: any): Promise<Model> {
        const product = await this.productModel.create(data);
        return product;
    }

    async update(id: string, data: any): Promise<Model | null> {
        const [numUpdated, updatedProducts] = await this.productModel.update(data, { where: { id }, returning: true });
        if (numUpdated === 0) {
            return null;
        }
        return updatedProducts[0];
    }

    async delete(id: string): Promise<Model | null> {
        const deletedRows = await this.productModel.destroy({ where: { id } });
        if (deletedRows === 0) {
            return null;
        }
        return await this.productModel.findByPk(id);
    }

    async findOne(filter: any): Promise<Model | null> {
        const product = await this.productModel.findOne({ where: filter });
        return product;
    }

    async findWithSpecificFields(filter: any, fields: any): Promise<Model | null> {
        const product = await this.productModel.findOne({ where: filter, attributes: fields });
        return product;
    }

    async findAll(filter: any): Promise<Model[]> {
        const products = await this.productModel.findAll({ where: filter });
        return products;
    }

    async findAllWithSpecificFields(filter: any, fields: any): Promise<Model[]> {
        const products = await this.productModel.findAll({ where: filter, attributes: fields });
        return products;
    }
}