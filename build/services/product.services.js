"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.create(data);
            return product;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [numUpdated, updatedProducts] = yield this.productModel.update(data, { where: { id }, returning: true });
            if (numUpdated === 0) {
                return null;
            }
            return updatedProducts[0];
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedRows = yield this.productModel.destroy({ where: { id } });
            if (deletedRows === 0) {
                return null;
            }
            return yield this.productModel.findByPk(id);
        });
    }
    findOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.findOne({ where: filter });
            return product;
        });
    }
    findWithSpecificFields(filter, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.findOne({ where: filter, attributes: fields });
            return product;
        });
    }
    findAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productModel.findAll({ where: filter });
            return products;
        });
    }
    findAllWithSpecificFields(filter, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productModel.findAll({ where: filter, attributes: fields });
            return products;
        });
    }
}
exports.default = ProductService;
