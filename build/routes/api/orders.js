"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = __importDefault(require("../functions"));
const ordersRoutes = (router, rootPath) => {
    const ordersPath = `${rootPath}/orders`;
    const ordersIdPath = `${ordersPath}/:id`;
    router.route(ordersPath)
        .get((req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
    })
        .post(functions_1.default.requireRoles(['user']), (req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
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
        .put(functions_1.default.requireRoles(['user, admin']), (req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
    })
        .delete(functions_1.default.requireRoles(['user']), (req, res) => {
        res.status(501).json({ error: true, message: `Not Implemented` });
    });
};
exports.default = ordersRoutes;
