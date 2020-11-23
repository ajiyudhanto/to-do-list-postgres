# How To Use

NOTE:

I'm assuming that you already have PostgreSQL in your computer system. If not, you can visit:

`https://www.postgresqltutorial.com/postgresql-getting-started/`

to know step-by-step how to install PostgreSQL based on your computer operating system.

OK, lets get started:

1. clone this repository to your local system

2. move to cloned repo directory, and then open terminal

3. in terminal, run `npm install`

4. in terminal, create a postgreSQL database using:

    `psql -h localhost -p 5432 -U <database_username> -c "CREATE DATABASE to_do_app;"`

    in my case, my database_username is postgres, so I type this:

    `psql -h localhost -p 5432 -U postgres -c "CREATE DATABASE to_do_app;"`

5. in ormconfig.json, change username and password based on your own postgres username and password

6. in terminal, run `typeorm migration:run` or `npx typeorm migration:run`

7. now you can use this by running `npm start` in terminal and App will listen at `http://localhost:3000`