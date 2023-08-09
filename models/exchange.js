"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exchange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exchange.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      from: DataTypes.STRING,
      to: DataTypes.STRING,
      ask: DataTypes.INTEGER,
      date: DataTypes.DATE,
      exchangeOfficeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "exchange",
      modelName: "Exchange",
    },
    { timestamps: false }
  );
  return Exchange;
};
