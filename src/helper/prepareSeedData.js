const parser = require("./parser");

const prepareSeedData = () => {
  const data = parser();
  const country = data.countries;
  const exchangeRates = [];
  const exchangeOperations = [];
  const exchangeOffice = [];
  data["exchange-offices"].map((office) => {
    const { id, name, rates, exchanges } = office;
    exchangeOffice.push({ name, countryId: Number(id) });
    rates.map((rate) => {
      const { from, to, out, date, reserve } = rate;
      exchangeRates.push({
        from,
        to,
        out: Number(out),
        in: Number(rate.in),
        date,
        reserve: Number(reserve),
        exchangeOfficeId: Number(id),
      });
    });
    exchanges.map((exchange) => {
      const { from, to, ask, date } = exchange;
      exchangeOperations.push({
        from,
        to,
        ask: Number(ask),
        exchangeOfficeId: Number(id),
        date,
      });
    });
  });

  return {
    exchangeOffice,
    exchangeOperations,
    exchangeRates,
    country,
  };
};

module.exports = prepareSeedData();
