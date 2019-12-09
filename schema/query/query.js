const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { MovieType } = require('../../types/types');

module.exports = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    movie: {
      type: MovieType,
      args: { _id: { type: GraphQLString } },
    },
    movies: {
      type: new GraphQLList(MovieType),
    },
  }),
});
