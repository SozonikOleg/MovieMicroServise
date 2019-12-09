/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
const { PubSub } = require('apollo-server-express');
const { Movie } = require('../mongoDb/userSchema');

const pubsub = new PubSub();
const TOPIC = 'infoTopic';


const resolvers = {

  Query: {

    movie: async (parent, args) => {
      const res = await Movie.findById(args._id);
      return res;
    },

    movies: async () => {
      const res = await Movie.find({});
      return res;
    },

  },


  Mutation: {

    addMovie: async (parent, args) => { // good working
      const movie = new Movie({
        name: args.name,
        genre: args.genre,
        directorId: args.directorId,
      });
      const res = await movie.save();
      res && pubsub.publish(TOPIC, { info: 'Added new movie' }); // checking
      return res;
    },

    updateMovie: async (parent, args) => { // good working
      const updateMovie = await Movie.findByIdAndUpdate(
        args._id,
        { $set: { name: args.name, genre: args.genre, directorId: args.directorId } },
        { new: true },
      );
      updateMovie && pubsub.publish(TOPIC, { info: `Movie with _id: ${args._id} updated` });// checking
      return updateMovie;
    },

    deleteMovie: async (parent, args) => { // good working
      const delMovie = await Movie.findByIdAndRemove(args._id);
      delMovie && pubsub.publish(TOPIC, { info: `Movie with _id:${args._id} deleted` }); // checking
      return delMovie;
    },
  },


  Subscription: {
    info: {
      subscribe: () => pubsub.asyncIterator([TOPIC]),
    },
  },

};

module.exports = resolvers;
