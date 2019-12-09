const mongoose = require('mongoose');

const { Schema } = mongoose;

const moviesSchema = new Schema({
  id: String,
  name: String,
  genre: String,
  directorId: String,
});

const Movie = mongoose.model('movies', moviesSchema);

module.exports = {
  Movie,
};
