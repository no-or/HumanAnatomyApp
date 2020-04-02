const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.promise = global.Promise;

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === "ns not found") return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes("a background operation is currently running"))
        return;
      console.log(error.message);
    }
  }
}

const setupDB = databaseName => {
  // Connect to Mongoose
  beforeAll(async () => {
    const url = `mongodb+srv://dood1:1QvX7ZeIKurf3VwF@main-cluster-qxdab.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  });
};

// Cleans up database between each test
const afterDesc = () => {
  afterAll(async () => {
    await removeAllCollections();
  });
};

// Disconnect Mongoose
const afterEverything = () => {
  afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
  });
};

exports.setupDB = setupDB;
exports.afterDesc = afterDesc;
exports.afterEverything = afterEverything;
