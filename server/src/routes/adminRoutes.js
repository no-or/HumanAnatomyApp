const express = require("express");
const AdminModel = require("../models/admins");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyAdmin = require("../util/verifyToken");

const ValidationSchema = Joi.object().keys({
    name: Joi.string().min(6).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required()
});

const initializeAdminRoutes = (app) => {
    const adminRouter = express.Router();
    app.use('/admin', adminRouter);

    /* create an admin */
    adminRouter.post('/register', async (req, res) => {
        const {error} = ValidationSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const admin = new AdminModel(req.body);
        try {
            await admin.save().then((item) => res.send(item));
        } catch (e) {
            res.status(400).send(e.errmsg);
        }
    });

    /* delete an admin */
    adminRouter.delete('/:id', verifyAdmin,  async (req, res, next) => {
        const id = req.params.id.trim();
        try {
            const admin = await AdminModel.findByIdAndDelete(id);
            if (admin === null) {
                throw new Error(`No admin found with the id ${id}`);
            } else {
                res.status(200).send(`removed the admin with id ${id}`);
            }
        } catch (e) {
            console.error(e);
            return next(e);
        }
    });

    /* login */
    adminRouter.post('/login', async (req, res) => {
        //Check if email exists
        const admin = await AdminModel.findOne({email:req.body.email});
        if(!admin) return res.status(400).send(`User does not exist`);

        //Check if the password is right
        const validPass = await bcrypt.compare(req.body.password, admin.password);
        if(!validPass) return res.status(400).send(`Invalid Password`);

        //Create and assign a token
        const token = jwt.sign({_id: admin._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(`Logged in!`);
    });
};

module.exports = initializeAdminRoutes;
