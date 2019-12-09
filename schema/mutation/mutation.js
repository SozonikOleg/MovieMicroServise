const graphql = require('graphql');
const { MovieType } = require('../../types/types');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = graphql;

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLInt },
      },
    },
    deleteMovie: {
      type: MovieType,
      args: { _id: { type: GraphQLID } },
    },
    updateMovie: {
      type: MovieType,
      args: {
        _id: { type: GraphQLString },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLString },
      },
    },
  }),
});
