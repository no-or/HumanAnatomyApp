const express = require("express");
const QuestionModel = require("../models/questions");

const initializeQuestionRoutes = (app) => {
    const questionRouter = express.Router();
    app.use('/question', questionRouter);

    /* create a question */
    questionRouter.post('/', async (req, res) => {
        const question = new QuestionModel(req.body);
        try {
            await question.save().then((item) => res.send(item));
        } catch (e) {
            console.error(e);
            res.status(500);
            res.json('Could not create the Question');
        }
    });

    /* get a question with id */
    questionRouter.get('/:id', async (req, res) => {
        try {
            const question = await QuestionModel.findById(req.params.id);
            res.status(200);
            res.json(question);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.json('Could not fetch the Question');
        }
    });
};

module.exports = initializeQuestionRoutes;
