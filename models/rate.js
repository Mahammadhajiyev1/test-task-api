"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rate.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      from: DataTypes.STRING,
      to: DataTypes.STRING,
      in: DataTypes.INTEGER,
      reserve: DataTypes.INTEGER,
      out: DataTypes.INTEGER,
      date: DataTypes.DATE,
      exchangeOfficeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "rate",
      modelName: "Rate",
    },
    { timestamps: false }
  );
  return Rate;
};
