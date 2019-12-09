const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = graphql;


const MovieType = new GraphQLObjectType({
  name: 'Movies',
  fields: () => ({
    directorId: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = {
  MovieType,
};
