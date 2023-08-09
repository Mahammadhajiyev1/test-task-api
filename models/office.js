"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Office extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Office.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING,
      countryId: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "office",
      modelName: "Office",
    },
    { timestamps: false }
  );
  return Office;
};
