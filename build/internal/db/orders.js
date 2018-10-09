"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const ordersTable = 'orders';
class Orders {
    static getOrders() {
        return _1.default(ordersTable).select();
    }
    static addOrder(ordername) {
        return _1.default(ordersTable).insert({ ordername });
    }
    static updateOrder(id, ordername, approved) {
        return _1.default(ordersTable).update({ ordername, approved }).where({ id });
    }
    static deleteOrder(id) {
        return _1.default(ordersTable).delete().where({ id });
    }
}
exports.default = Orders;
