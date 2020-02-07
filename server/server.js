const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

// Import routes
const bodyParser = require("body-parser");
const initializeFlashcardRoutes = require("./src/routes/flashcardRoutes");
const initializeQuizRoutes = require("./src/routes/quizRoutes");
const initializeImageRoutes = require("./src/routes/ImageRoutes");
const initializeStatRoutes = require("./src/routes/statRoutes");
const initializeAdminRoutes = require("./src/routes/adminRoutes");
const initializeCodeRoutes = require("./src/routes/codeRoutes");

const PORT = process.env.PORT || 8090;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION || 'mongodb://localhost:27017/test';
const app = express();

// middle wares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// initialize the routes
initializeFlashcardRoutes(app);
initializeQuizRoutes(app);
initializeImageRoutes(app);
initializeStatRoutes(app);
initializeAdminRoutes(app);
initializeCodeRoutes(app);

// Connect to DB
mongoose
    .connect(DB_CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('Connected to MongoDB!'));

try {
    app.listen(PORT);
    console.log(`Server listening on port ${PORT}`);
} catch (e) {
    console.error(e);
    throw e;
}
