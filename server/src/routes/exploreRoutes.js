const express = require("express");
const ExploreModel = require("../models/explore");
const verifyAdmin = require("../util/verifyToken");

const initializeExploreRoutes = (app) => {
    const exploreRouter = express.Router();
    app.use('/explore', exploreRouter);

    /* create a explore section */
    exploreRouter.post('/', verifyAdmin,  async (req, res) => {
        const explore = new ExploreModel(req.body);
        try {
            await explore.save().then((item) => res.send(item));
        } catch (e) {
            res.status(400).send(e.message);
        }
    });

    /* get explore sections by query */
    exploreRouter.get('/', async (req, res, next) => {
        try {
            const data = await ExploreModel.find(req.query);
            if (data === null || data.length === 0) {
                res.status(404).send(`No such data found`);
            } else {
                res.status(200);
                await res.json(data);
            }
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });

    /* remove a section by the title */
    exploreRouter.delete('/', verifyAdmin,  async (req, res, next) => {
        const title = req.query.title;
        if(!title) {
            res.status(400).send('Please pass title as a query parameter');
        }
        try {
            const explore = await ExploreModel.findOneAndRemove({title: title});
            if (explore === null) {
                throw new Error(`No data found with the title ${title}`);
            } else {
                res.status(200).send(`removed the data with title ${title}`);
            }
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });
};

module.exports = initializeExploreRoutes;
