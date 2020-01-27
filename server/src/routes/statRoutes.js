const express = require("express");
const StatModel = require("../models/stats");

const initializeStatRoutes = (app) => {
    const statRouter = express.Router();
    app.use('/stat', statRouter);

    /* create a stat */
    statRouter.post('/', async (req, res, next) => {
        const stat = new StatModel(req.body);
        try {
            await stat.save().then((item) => res.send(item));
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });

    /* get all the stats or by query */
    //TODO add auth
    statRouter.get('/', async (req, res, next) => {
        try {
            const stats = await StatModel.find(req.query);
            if (stats === null) {
                throw new Error(`No stats found`);
            } else {
                res.status(200);
                await res.json(stats);
            }
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });
};

module.exports = initializeStatRoutes;
