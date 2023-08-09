const express = require("express");
const router = express.Router();
const db = require("../../models/index");
const { Exchange, Rate, Country, Office } = require("../../models");

router.all("/", (req, res, next) => {
  // res.json({ message: "return from ticket router" });
  next();
});

router.get("/", async (req, res) => {
  const limit = 1;

  const [results, metadata] = await db.sequelize
    .query(`with transactions_with_bids as (
      select
        *,
        (
          select
            (exchange."ask" / (rate."out" / rate."in"))
          from
            rate
          where
            rate."exchangeOfficeId" = exchange."exchangeOfficeId"
            and rate."date" < exchange."date"
            and rate."from" = exchange."from"
            and rate."to" = exchange."to"
          limit
            1
        ) as bid
      from
        exchange 
      where
        exchange."date" >= date_trunc('month', current_date)
        and exchange."date" <= now()
    ),
    transactions_usd as (
      select
        *,
        (
          select
            exchange."ask" / rate."in"
          from
            rate
          where
            rate."exchangeOfficeId" = exchange."exchangeOfficeId"
            and rate."date" < exchange."date"
            and rate."from" = exchange."to"
            and rate."to" like 'USD'
          limit
            1
        ) as ask_usd,
        (
          select
            exchange."bid" / (rate."in" / rate."out")
          from
            rate
          where
            rate."exchangeOfficeId" = exchange."exchangeOfficeId"
            and rate."date" < exchange."date"
            and rate."from" = exchange."from"
            and rate."to" like 'USD'
        ) as bid_usd
      from
        transactions_with_bids as exchange
    ),
    cte_aggregated_transactions as (
      select
        transactions."exchangeOfficeId",
        SUM(transactions."ask_usd" - transactions."bid_usd") as profit
      from
        transactions_usd as transactions
      group by
        transactions."exchangeOfficeId"
    ),
    cte_top_offices_by_country as (
      select
        *,
        ROW_NUMBER() over (
          partition by office."countryId"
          order by
            transactions."profit" desc
        ) as row_number
      from
        office
        inner join cte_aggregated_transactions as transactions on office."id" = transactions."exchangeOfficeId"
    )
    select
      offices."id",
      offices."name" as exchanger,
      country."name" as country,
      offices."profit"::numeric(18,2)::float as profit_in_usd
    from
      cte_top_offices_by_country as offices
      inner join (
        select
          *
        from
          country
      ) as country on country."id" = offices."countryId"
    where
      offices.row_number <= ${limit}
    order by
      offices."profit" desc
    `);

  res.send(results);
});

module.exports = router;
