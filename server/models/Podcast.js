const mongoose = require('mongoose');

const { Schema } = mongoose;

const podcastModel = new Schema({
  id: Number,
  title: { type: String },
  artistId: Number,
  category: { type: String },
  imageUrl: { type: String },
});

podcastModel.method('transform', function () {
  var podcastObject = this.toObject();
  podcastObject.id = podcastObject._id;
  delete podcastObject._id;
  return podcastObject;
});

module.exports = mongoose.model('Podcast', podcastModel);
