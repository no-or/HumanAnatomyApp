const express = require("express");
const QuizModel = require("../models/quizzes");
const verifyAdmin = require("../util/verifyToken");

const initializeQuizRoutes = app => {
  const quizRouter = express.Router();
  app.use("/quiz", quizRouter);

  /* create a quiz */
  quizRouter.post("/", verifyAdmin, async (req, res) => {
    const quiz = new QuizModel(req.body);
    try {
      await quiz.save().then(item => res.send(item));
    } catch (e) {
      res.status(400).send(`Could not create the quiz for ${e.message}`);
    }
  });

  /* get a quiz with id */
  quizRouter.get("/:id", async (req, res) => {
    try {
      const quiz = await QuizModel.findById(req.params.id);
      if (quiz === null || quiz.length === 0) {
        res.status(404).send(`No quiz found with id ${req.params.id}`);
      } else {
        res.status(200);
        res.json(quiz);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not get the quiz with id ${req.params.id} for ${e.message}`
        );
    }
  });

  /* get all the quizzes or by query */
  quizRouter.get("/", async (req, res) => {
    try {
      const quizzes = await QuizModel.find(req.query);
      if (quizzes === null || quizzes.length === 0) {
        res.status(404).send(`No such quizzes found`);
      } else {
        res.status(200);
        res.json(quizzes);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not get the quizzes with query ${req.query} for ${e.message}`
        );
    }
  });

  /* remove a quiz with the id */
  quizRouter.delete("/:id", verifyAdmin, async (req, res) => {
    const id = req.params.id.trim();
    try {
      const quiz = await QuizModel.findOneAndRemove({ _id: id });
      if (quiz === null || quiz.length === 0) {
        res.status(404).send(`No quiz found with id ${req.params.id}`);
      } else {
        res.status(200).send(`removed the quiz with id ${id}`);
      }
    } catch (e) {
      res
        .status(500)
        .send(
          `Could not remove the quiz with id ${req.params.id} for ${e.message}`
        );
    }
  });
};

module.exports = initializeQuizRoutes;
