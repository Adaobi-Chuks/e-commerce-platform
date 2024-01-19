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
class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderModel.create(data);
            return order;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [numUpdated, updatedOrders] = yield this.orderModel.update(data, {
                where: { id },
                returning: true,
            });
            if (numUpdated === 0) {
                return null;
            }
            return updatedOrders[0];
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedRows = yield this.orderModel.destroy({ where: { id } });
            if (deletedRows === 0) {
                return null;
            }
            return yield this.orderModel.findByPk(id);
        });
    }
    findOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderModel.findOne({ where: filter });
            return order;
        });
    }
    findAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.orderModel.findAll({ where: filter });
            return orders;
        });
    }
}
exports.default = OrderService;
