const express = require("express");
const QuizModel = require("../models/quizzes");

const initializeQuizRoutes = (app) => {
    const quizRouter = express.Router();
    app.use('/quiz', quizRouter);

    /* create a quiz */
    quizRouter.post('/', async (req, res) => {
        const question = new QuizModel(req.body);
        try {
            await question.save().then((item) => res.send(item));
        } catch (e) {
            console.error(e);
            res.status(500);
            res.json('Could not create the Quiz');
        }
    });

    /* get a quiz with id */
    quizRouter.get('/:id', async (req, res) => {
        try {
            const question = await QuizModel.findById(req.params.id);
            res.status(200);
            res.json(question);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.json('Could not fetch the Quiz');
        }
    });
};

module.exports = initializeQuizRoutes;
