module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define(
    "Transactions",
    {
      transaction_type: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      descriptions: DataTypes.STRING,
      transaction_type: DataTypes.DATEONLY,
      running_balance: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
    },
    {
      timestamps: false,
    }
  );

  return transaction;
};
