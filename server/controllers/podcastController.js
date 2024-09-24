const { cloudinary } = require('../utils/cloudinary');
const { transformPodcast } = require('../utils/helper');

const streamifier = require('streamifier');
const { Readable } = require('stream');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');

function podcastController() {
  //method to get the collectiong of all the podcasts from database
  async function get(req, res) {
    try {
      const { db, client } = await connectToDatabase();
      //find will return cursor to the collection
      let podcasts = await db.collection('podcasts').find({});

      const returnedPodcasts = [];
      //iterate over the collection and transform podcast for compatibility

      while (await podcasts.hasNext()) {
        const podcast = await podcasts.next();
        returnedPodcasts.push(transformPodcast(podcast));
      }

      client.close();

      res.status(201);
      return res.json(returnedPodcasts);
    } catch (err) {
      console.log(err);
      res.send(400);
    }
  }

  //method to get podcast by id
  async function getById(req, res) {
    const podcastId = req.params.id;
    try{
      const { db, client } = await connectToDatabase();

      let podcast = await db.collection('podcasts').find({_id: podcastId});

      if (podcast) {
          const returnPodcast = podcast.transform();
          return res.json(returnPodcast);
        }else{
          return res.status(404); 
        }
    }catch(err){
      console.log("An error has occured while getting podcast by id"+ err)
      return res.send(err);
    }
  }

  async function deleteById(req, res) {
    const { db, client } = await connectToDatabase();
    try {
      var podcastId = new mongodb.ObjectID(req.params.id);
    } catch (err) {
      return res.send(400).json({ message: 'Invalid podcast Id in URL' });
    }

    let deleteResult = await db
      .collection('podcasts')
      .deleteOne({ _id: podcastId });
    return res.status(200);
  }

  async function post(req, res, err) {
    const podcast = req.body;
    const imageFile = req.files.image[0];
    const audioFile = req.files.audio[0];
    podcast.artistId = parseInt(podcast.artistId, 10);

    //upload imageFile to the cloud
    let uploadResponse = await uploadImageFromBuffer(imageFile);
    podcast.imageUrl = uploadResponse.url;

    try {
      const { db, client } = await connectToDatabase();
      let podcastReturned = await db.collection('podcasts').insertOne(podcast);

      podcast._id = podcastReturned.insertedId;

      let podcastName = req.body.name;

      const readableAudioStream = new Readable();
      readableAudioStream.push(audioFile.buffer);
      readableAudioStream.push(null);

      let bucket = new mongodb.GridFSBucket(db, {
        bucketName: 'audios',
      });

      let audioUploadStream = bucket.openUploadStreamWithId(
        podcastReturned.insertedId,
        podcastName
      );

      readableAudioStream.pipe(audioUploadStream);

      audioUploadStream.on('error', () => {
        return res.status(500).json({ message: 'Error Uploading audio file' });
      });

      audioUploadStream.on('finish', () => {
        return res.status(201).json(podcast);
      });
    } catch (err) {
      console.log(err);
      res.send(400);
    }
  }

  function uploadImageFromBuffer(imageFile) {
    return new Promise((resolve, reject) => {
      let upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: 'images',
        },
        function (error, result) {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(imageFile.buffer).pipe(upload_stream);
    });
  }

  async function connectToDatabase() {
    let client;
    try {
      client = await MongoClient.connect(process.env.DATABASE_URL);
      const db = client.db('podcastAppDB');
      return { db, client };
    } catch (err) {
      console.log(err);
      res.send(400);
    }
  }

  async function streamPodcastById(req, res) {
    try {
      var podcastId = new mongodb.ObjectID(req.params.podcastId);
    } catch (err) {
      return res.send(400).json({ message: 'Invalid podcast Id in URL' });
    }

    const { db, client } = await connectToDatabase();

    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');

    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: 'audios',
    });

    let downloadStream = bucket.openDownloadStream(podcastId);
    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('error', () => {
      res.sendStatus(404);
    });

    downloadStream.on('end', () => {
      res.end();
    });
  }

  return { post, get, getById, deleteById, streamPodcastById };
}

module.exports = podcastController;
