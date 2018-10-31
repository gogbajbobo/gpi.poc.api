"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rootRoute = (router) => {
    router.route('/')
        .get((req, res) => res.send(`<html><head></head><body>gpi.poc.server</body></html>`));
};
exports.default = rootRoute;
