const express = require("express");
const HierarchyModel = require("../models/hierarchy");
const verifyAdmin = require("../util/verifyToken");

const initializeHierarchyRoutes = (app) => {
    const hierarchyRouter = express.Router();
    app.use('/hierarchy', hierarchyRouter);

    /* create a hierarchy */
    hierarchyRouter.post('/', verifyAdmin,  async (req, res) => {
        const hierarchyDB = await HierarchyModel.countDocuments();
        if(hierarchyDB !== 0) {
            return res.status(400).send('Can not have more than one hierarchy in the DB');
        }
        const hierarchy = new HierarchyModel(req.body);
        try {
            await hierarchy.save().then((item) => res.send(item));
        } catch (e) {
            res.status(400).send(`Could not create the hierarchy for ${e.message}`);
        }
    });

    /* get the hierarchy */
    hierarchyRouter.get('/', async (req, res) => {
        try {
            const hierarchy = await HierarchyModel.find();
            if (hierarchy === null || hierarchy.length === 0) {
                res.status(404).send('No hierarchy found in the DB');
            } else {
                res.status(200);
                await res.json(hierarchy);
            }
        } catch (e) {
            res.status(500).send(`Could not get the hierarchy with id ${req.params.id} for ${e.message}`);
        }
    });

    /* modify the hierarchy */
    hierarchyRouter.put('/', verifyAdmin, async (req, res) => {
        try {
            const hierarchy = await HierarchyModel.findOneAndUpdate(req.body);
            if (hierarchy === null || hierarchy.length === 0) {
                res.status(404).send('No hierarchy found in the DB');
            } else {
                res.status(200);
                await res.json('hierarchy updated successfully');
            }
        } catch (e) {
            res.status(500).send(`Could not update the hierarchy for ${e.message}`);
        }
    });

    /* remove the hierarchy */
    hierarchyRouter.delete('/', verifyAdmin,  async (req, res) => {
        try {
            const hierarchy = await HierarchyModel.findOneAndRemove({});
            if (hierarchy === null) {
                res.status(404).send('No hierarchy found with in the DB');
            } else {
                res.status(200).send(`removed the hierarchy in the DB`);
            }
        } catch (e) {
            res.status(500).send(`Could not remove the hierarchy for ${e.message}`);
        }
    });
};

module.exports = initializeHierarchyRoutes;
