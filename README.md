This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites 

1. Make a copy of the ".env.example" file and change the filename of the copy to ".env" (this .env file is where you put the values of your environment variables).
2. Set up your your environment variables in the .env file. Make sure the database name in your `DATABASE_URL` matches the name of the database server you will make in the next step.
3. Create an empty database which has the Postgis extensions (just in case we want to have geometries and geopositions in the future).
```
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;
```

### What to do to run the app

> Note: I modified `dev` script so that when you run `npm run dev`, migrations are performed first to always ensure your local database is up to date.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


### What to do when you want to modify the database

We are following a "Codebase first" approach. Codebase first is when database schema in our codebase is a source of truth and is under version control. We declare and manage our database schema in TypeScript and then we apply that schema to the database itself with `drizzle-kit` tools (especially `drizzle-kit`'s `generate` and `migrate`).

> IF YOU WANT TO EDIT THE DATABASE, EDIT THE CODE IN OUR SCHEMA AND PERFORM MIGRATIONS. DO NOT EDIT USING OTHER SOFTWARE.

Below is the workflow when modifying the database:

1. In terminal/CMD run `git pull origin main` so that you get the updates made by other devs in the schema definition of the codebase. Resolve any conflicts that arise.
2. In terminal/CMD run `npx drizzle-kit generate` to make migration files.
3. In terminal/CMD run `npx drizzle-kit migrate` to perform migrations so that your local database gets updated.
4. Modify the schema definition of the database in the code.
5. In terminal/CMD run `npx drizzle-kit generate` again to make migration files of your modifications.
6. In terminal/CMD run `npx drizzle-kit migrate` again to perform migrations so that your local database gets updated with your modifications
7. Repeat step 1 again and if there are updates to the database schema, repeat step 2 and then step 3. Afterwards you can make a pull request.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
