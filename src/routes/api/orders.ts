import { Router } from 'express'
import fn from '../functions'

const ordersRoutes = (router: Router, rootPath: string) => {

    const ordersPath = `${ rootPath }/orders`;
    const ordersIdPath = `${ ordersPath }/:id`;

    router.route(ordersPath)

        .get((req, res) => {
            res.status(501).json({error: true, message: `Not Implemented`})
        })

        .post(fn.requireRoles(['user']), (req, res) => {
            res.status(501).json({error: true, message: `Not Implemented`})
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

        .put(fn.requireRoles(['user, admin']), (req, res) => {
            res.status(501).json({error: true, message: `Not Implemented`})
        })

        .delete(fn.requireRoles(['user']), (req, res) => {
            res.status(501).json({error: true, message: `Not Implemented`})
        })

};

export default ordersRoutes
