function transformPodcast(podcast) {
  podcast.id = podcast._id;
  podcast.artistId = parseInt(podcast.artistId, 10);
  delete podcast._id;
  return podcast;
}

module.exports = { transformPodcast };
