const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/dbname";

console.log(dbUrl);

const connect = async () => {
  await mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

const close = () => mongoose.connection.close();

module.exports = { connect, close, url: dbUrl };
