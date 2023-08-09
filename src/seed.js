const prepareSeedData = require("./helper/prepareSeedData");

const data = prepareSeedData;

console.log(data.country);

// const seedDatabase = async () => {
//   await db.sync({ force: true });

//   await country.bulkCreate(data.country, {
//     individualHooks: true,
//     returning: true,
//   });
//   await exchange.bulkCreate(data.exchange, {
//     individualHooks: true,
//     returning: true,
//   });
//   await rate.bulkCreate(data.rate, {
//     individualHooks: true,
//     returning: true,
//   });
//   await office.bulkCreate(data.office, {
//     individualHooks: true,
//     returning: true,
//   });
// };

// seedDatabase();
