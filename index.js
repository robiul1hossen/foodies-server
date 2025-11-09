const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;
const app = express();

const uri =
  "mongodb+srv://foodies-server:foodies-server@cluster0.jtzysaz.mongodb.net/?appName=Cluster0";
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const reviews = client.db("reviews");
    const myReviewsColl = reviews.collection("myReviews");
    const allReviewsColl = reviews.collection("allReviews");

    app.post("/my-reviews", async (req, res) => {
      const newReview = req.body;
      const result = await myReviewsColl.insertOne(newReview);
      res.send(result);
    });
    app.post("/all-reviews", async (req, res) => {
      const newReview = req.body;
      const result = await allReviewsColl.insertOne(newReview);
      res.send(result);
    });
    app.get("/review-derails/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await allReviewsColl.findOne(query);
      res.send(result);
    });
    app.get("/all-reviews", async (req, res) => {
      const result = await allReviewsColl.find().toArray();
      res.send(result);
    });
    app.get("/top-rated-reviews", async (req, res) => {
      const result = await allReviewsColl
        .find()
        .sort({ rating: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello server");
});

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});

// foodies-server
