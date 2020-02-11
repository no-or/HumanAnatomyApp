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
            console.log(e.message)
            res.status(400).send(`Could not create the explorelab component for ${e.message}`);
        }
    });

    /* get explore sections by query */
    exploreRouter.get('/', async (req, res) => {
        try {
            const data = await ExploreModel.find(req.query);
            if (data === null || data.length === 0) {
                res.status(404).send(`No such exploreLab component found with query ${req.query}`);
            } else {
                res.status(200);
                await res.json(data);
            }
        } catch (e) {
            res.status(500).send(`Could not get the exploreLab component with query ${req.query} for ${e.message}`);
        }
    });

    /* remove a section by the title */
    exploreRouter.delete('/:id', verifyAdmin,  async (req, res) => {
        const id = req.params.id.trim();
        if(!id) {
            res.status(400).send('Please pass title of the exlporeLab component that you want to remove as a query param');
        }
        try {
            const explore = await ExploreModel.findByIdAndDelete(id);
            if (explore === null) {
                res.status(404).send(`No exploreLab component found with the title ${id}`);
            } else {
                res.status(200).send(`removed the exploreLab component with title ${id}`);
            }
        } catch (e) {
            console.log(e.message)
            res.status(500).send(`Could not delete the exploreLab component for ${e.message}`);
        }
    });
};

module.exports = initializeExploreRoutes;
