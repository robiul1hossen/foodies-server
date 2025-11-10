const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;
const app = express();

//firebase admin sdk
const admin = require("firebase-admin");
const serviceAccount = require("./foodies-firebase-adminsdk-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// middleWear
app.use(cors());
app.use(express.json());

const verifyFirebaseToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).send({ message: "unauthorize access" });
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    res.status(401).send({ message: "unauthorize access" });
  }
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.token_email = decoded.email;
    next();
  } catch (error) {}
};

const uri =
  "mongodb+srv://foodies-server:foodies-server@cluster0.jtzysaz.mongodb.net/?appName=Cluster0";

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
    const allReviewsColl = reviews.collection("allReviews");

    app.post("/all-reviews", async (req, res) => {
      const newReview = req.body;
      const result = await allReviewsColl.insertOne(newReview);
      res.send(result);
    });
    app.get("/review-derails/:id", async (req, res) => {
      const { id } = req.params;
      // const query = { _id: new ObjectId(id) };
      const query = { _id: id };
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
    app.get("/my-review", verifyFirebaseToken, async (req, res) => {
      const { email } = req.query;
      const query = {};
      if (!email) {
        res.status(301).send({ message: "email is required" });
      }
      if (email) {
        query.reviewerEmail = email;
        if (email !== req.token_email) {
          res.status(403).send({ message: "forbidden access" });
        }
      }
      const result = await allReviewsColl.find(query).toArray();
      res.send(result);
    });
    app.get("/my-review/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await allReviewsColl.findOne(query);
      res.send(result);
    });
    app.patch("/my-review/:id", async (req, res) => {
      const { id } = req.params;
      const updatedData = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          ...updatedData,
        },
      };
      const result = await allReviewsColl.updateOne(query, update);
      res.send(result);
    });
    app.delete("/my-review/:id", async (req, res) => {
      const { id } = req.params;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await allReviewsColl.deleteOne(query);
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
