"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const ordersTable = 'orders';
class Orders {
    static getOrders(userRoles, user_id) {
        if (userRoles.includes('admin'))
            return _1.default(ordersTable).select();
        return _1.default(ordersTable).select().where({ user_id });
    }
    static addOrder(user_id, ordername) {
        return _1.default(ordersTable).insert({ user_id, ordername });
    }
    static updateOrder(id, ordername, approved, user_id, userRoles) {
        if (userRoles.includes('admin'))
            return _1.default(ordersTable).update({ ordername, approved }).where({ id });
        return _1.default(ordersTable).update({ ordername, approved }).where({ id, user_id });
    }
    static deleteOrder(id) {
        return _1.default(ordersTable).delete().where({ id });
    }
}
exports.default = Orders;
