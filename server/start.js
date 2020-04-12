const mongoose = require("mongoose");
const app = require("./server.js");

const PORT = process.env.PORT;
const DB_CONNECTION_STRING = String(process.env.DB_CONNECTION);

// Connect to DB
mongoose
  .connect(DB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to MongoDB Atlas!"));

// try starting the server
try {
  app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
} catch (e) {
  console.error(e);
  throw e;
}
