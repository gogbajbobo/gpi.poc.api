import { Router } from 'express'
import fn from '../functions'
import Orders from '../../internal/db/orders'

const ordersRoutes = (router: Router, rootPath: string) => {

    const ordersPath = `${ rootPath }/orders`;
    const ordersIdPath = `${ ordersPath }/:id`;

    router.route(ordersPath)

        .get((req, res) => {

            Orders.getOrders()
                .then(orders => res.status(200).json({ error: false, orders }))
                .catch(err => fn.catchErr(err, res))

        })

        .post(fn.requireRoles(['user']), (req, res) => {

            const ordername: string = req.body.ordername;

            if (!ordername) {
                res.status(400).json({error: true, message: `Bad Request`})
            }

            Orders.addOrder(req.user.id, ordername)
                .then(order => res.status(200).json({ error: false, order }))
                .catch(err => fn.catchErr(err, res))

        });

    router.route(ordersIdPath)

        .all((req, res, next) => {

            return (req.params.id)
                ? next()
                : res.status(400).json({error: true, message: `have no id`})

        })

        .get((req, res) => {
            res.status(501).json({error: true, message: `Not Implemented`})
        })

        .put(fn.requireRoles(['user', 'admin']), (req, res) => {

            Orders.updateOrder(req.params.id, req.body.ordername, req.body.approved, req.user.id)
                .then(order => res.status(200).json({ error: false, order }))
                .catch(err => fn.catchErr(err, res))

        })

        .delete(fn.requireRoles(['user']), (req, res) => {

            Orders.deleteOrder(req.params.id)
                .then(order => res.status(200).json({ error: false, order }))
                .catch(err => fn.catchErr(err, res))

        })

};

export default ordersRoutes
