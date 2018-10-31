import { Router } from 'express'

const rootRoute = (router: Router) => {

    router.route('/')
        .get((req, res) => res.send(`<html><head></head><body>gpi.poc.server</body></html>`))

};

export default rootRoute
