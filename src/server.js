import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';

import 'dotenv/config';

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  }),
);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`),
);
