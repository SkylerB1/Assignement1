const Sequelize = require("sequelize");

const sequelize = new Sequelize("office_transactions", "root", "Vbnm@2022", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

module.exports = sequelize;
