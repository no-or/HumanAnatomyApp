const express = require("express");
const mongoose = require("mongoose");

// Import routes
const bodyParser = require("body-parser");
const initializeQuestionRoutes = require("./src/routes/questionRoutes");
const initializeFlashcardRoutes = require("./src/routes/flashcardRoutes");
const initializeQuizRoutes = require("./src/routes/QuizRoutes");
const initializeImageRoutes = require("./src/routes/ImageRoutes");

const PORT = process.env.PORT || 8090;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION || 'mongodb://localhost:27017/test';
const app = express();

// middle wares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize the routes
initializeQuestionRoutes(app);
initializeFlashcardRoutes(app);
initializeQuizRoutes(app);
initializeImageRoutes(app);

// Connect to DB
mongoose
    .connect(DB_CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'));

try {
    app.listen(PORT);
    console.log(`Server listening on port ${PORT}`);
} catch (e) {
    console.error(e);
    throw e;
}