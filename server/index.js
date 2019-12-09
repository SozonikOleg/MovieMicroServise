const http = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { addResolveFunctionsToSchema } = require('graphql-tools');
const schema = require('../schema/schema');
const resolvers = require('../schema/resolvers');
require('../config/connectwithDB');

const port = 8089;
addResolveFunctionsToSchema({ schema, resolvers });

const server = new ApolloServer({ schema, resolvers });
const app = express();
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}ql`),
  console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}ql`);
});

// app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}ql`));
