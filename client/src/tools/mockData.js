const authors = [
  { id: 1, name: 'Cory House' },
  { id: 2, name: 'Scott Allen' },
  { id: 3, name: 'Dan Wahlin' },
];

const newPodcast = {
  id: null,
  title: '',
  year: '',
  artistId: null,
  summary: '',
  imageUrl: '',
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newPodcast,
  authors,
};
