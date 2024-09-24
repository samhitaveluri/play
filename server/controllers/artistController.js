const MongoClient = require('mongodb').MongoClient;

function artistController() {
  //todo: to be moved to global variables or db config file
  const dbName = 'podcastAppDB';

  //utility method to get mongo client and database
  async function connectToDatabase() {
    let client;
    try {
      client = await MongoClient.connect(process.env.DATABASE_URL);
      const db = client.db(dbName);
      return { db, client };
    } catch (err) {
      console.log(err);
      res.send(400);
    }
  }

  //method to get the list of artists from the database
  async function get(req, res) {
    try {
      const { db, client } = await connectToDatabase();
      let artists = await db.collection('artists').find({});

      const returnedArtist = [];

      while (await artists.hasNext()) {
        const artist = await artists.next();
        returnedArtist.push(artist);
      }
      client.close();

      res.status(201);

      return res.json(returnedArtist);
    } catch (err) {
      console.log(err);
      res.send(400);
    }
  }
  return { get };
}

module.exports = artistController;
