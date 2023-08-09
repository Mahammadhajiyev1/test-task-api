"use strict";
const prepareSeedData = require("../src/helper/prepareSeedData");

const data = prepareSeedData;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("country", data.country, {});
    await queryInterface.bulkInsert("office", data.exchangeOffice, {});
    await queryInterface.bulkInsert("exchange", data.exchangeOperations, {});
    await queryInterface.bulkInsert("rate", data.exchangeRates, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("country", null, {});
    await queryInterface.bulkDelete("office", null, {});
    await queryInterface.bulkDelete("exchange", null, {});
    await queryInterface.bulkDelete("rate", null, {});
  },
};
