"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = __importDefault(require("../functions"));
const orders_1 = __importDefault(require("../../internal/db/orders"));
const ordersRoutes = (router, rootPath) => {
    const ordersPath = `${rootPath}/orders`;
    const ordersIdPath = `${ordersPath}/:id`;
    router.route(ordersPath)
        .get((req, res) => {
        orders_1.default.getOrders()
            .then(orders => res.status(200).json({ error: false, orders }))
            .catch(err => functions_1.default.catchErr(err, res));
    })
        .post(functions_1.default.requireRoles(['user']), (req, res) => {
        const ordername = req.body.ordername;
        if (!ordername) {
            res.status(400).json({ error: true, message: `Bad Request` });
        }
        orders_1.default.addOrder(ordername)
            .then(order => res.status(200).json({ error: false, order }))
            .catch(err => functions_1.default.catchErr(err, res));
    });
    router.route(ordersIdPath)
        .all((req, res, next) => {
        return (req.params.id)
            ? next()
            : res.status(400).json({ error: true, message: `have no id` });
    })
        .get((req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
    })
        .put(functions_1.default.requireRoles(['user', 'admin']), (req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
    })
        .delete(functions_1.default.requireRoles(['user']), (req, res) => {
        orders_1.default.deleteOrder(req.params.id)
            .then(order => res.status(200).json({ error: false, order }))
            .catch(err => functions_1.default.catchErr(err, res));
    });
};
exports.default = ordersRoutes;
