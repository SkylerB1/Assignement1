// import sequelize from "../Config/db";

const sequelize = require("../Config/db");
const { DataTypes, Sequelize } = require("sequelize");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync");
});

db.Transactions = require("./transaction")(sequelize, DataTypes);

module.exports = db;
