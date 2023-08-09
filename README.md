# How to start

1. Modify `.env.example` to `.env`
2. Start database with `npm run db`
3. Install all dependencies with `npm install`
4. Migrate database with `npm run migrate`
5. Seed database with `npm run seed`
6. Run application with `npm start`

# ANSWERS

1.  How to change the code to support different file format versions?

We can add different parser for that

2. How will the import system change if in the future we need to get this data from a web API?

   We can change source for to perform this action

3. If in the future it will be necessary to do the calculations using the national bank rate, how could this be added to the system?

   With webhooks or fetching data from sources. Both approach has some benefits.

4. How would it be possible to speed up the execution of requests if the task allowed you to update market data once a day or even less frequently? Please explain all possible solutions you could think of.

We can use caching or we can store data to DB then we can use it without calculation.
