const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://ted:ted@cluster0-ocswh.mongodb.net?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
// async function run() {
const run = async () => {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");
    // query movie with title back to the future
    const query = { title: "Back to the Future" };
    const movie = await collection.findOne(query);
    // console.log(movie);
    const allMovies = await collection
      .find({}, { projection: { title: 1, imdb: 1, languages: 1, awards: 1 } })
      //   .max(100)
    //   .maxScan(100)
    .limit(20)
      .toArray();
    console.log(allMovies);
  } finally {
    //this is executed always, like right now its closing the connection no matter what
    //ensures client will close when error/finish
    await client.close();
  }
};
run().catch(console.dir);
