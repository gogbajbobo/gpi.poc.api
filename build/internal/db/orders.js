"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
class Orders {
    static getOrders() {
        return _1.default('orders').select();
    }
    static addOrder(ordername) {
        return _1.default('orders').insert({ ordername });
    }
}
exports.default = Orders;
