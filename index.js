const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server-fastify');
const Reply = require('fastify/lib/reply');
const Request = require('fastify/lib/request');

const fastify = require('fastify')();

const typeDefs = gql`
  type Test {
    id: ID!
    message: String!
  }

  type Query {
    test: Test
  }
`;

const resolvers = {
  Query: {
    test: () => {
      return { id: '1', message: 'hello' };
    },
  },
};

const context = (...args) => {
  console.log(`There are ${args.length} args being passed into context`);

  args.forEach((arg, index) => {
    const argName = `Arg #${index + 1}`;

    if (arg instanceof Reply) {
      console.log(`${argName} is a Fastify Reply`);
    }
    if (arg instanceof Request) {
      console.log(`${argName} is a Fastify Request`);
    } else {
      console.log(`${argName}: ${arg}`);
    }
  });

  return {};
};

const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

fastify.register(gqlServer.createHandler());

fastify.inject({
  path: '/graphql',
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ query: '{ test { message } }' }),
});
