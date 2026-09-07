import "dotenv/config";
import cors from "cors";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = Number(process.env.SELLER_API_PORT || 4000);
const mongoUri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DATABASE || "wheelybits";

if (!mongoUri) {
  console.error("MONGODB_URI is required to start the seller API.");
  process.exit(1);
}

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "20mb" }));

const client = new MongoClient(mongoUri);

app.get("/api/health", async (_request, response) => {
  try {
    await client.db(databaseName).command({ ping: 1 });
    response.json({ ok: true, database: databaseName });
  } catch {
    response.status(503).json({ ok: false, error: "MongoDB is unavailable." });
  }
});

app.put("/api/sellers/:userId", async (request, response) => {
  const { userId } = request.params;
  if (!userId || !request.body?.store) {
    response.status(400).json({ error: "userId and store data are required." });
    return;
  }

  try {
    const sellers = client.db(databaseName).collection("sellers");
    const now = new Date();
    const result = await sellers.findOneAndUpdate(
      { userId },
      { $set: { ...request.body, userId, updatedAt: now }, $setOnInsert: { createdAt: now } },
      { upsert: true, returnDocument: "after" },
    );
    response.status(200).json({ seller: result });
  } catch (error) {
    console.error("Failed to save seller profile", error);
    response.status(500).json({ error: "Failed to save seller profile." });
  }
});

app.get("/api/sellers/:userId/dashboard", async (request, response) => {
  const { userId } = request.params;
  if (!userId) {
    response.status(400).json({ error: "userId is required." });
    return;
  }

  try {
    const database = client.db(databaseName);
    const [seller, products] = await Promise.all([
      database.collection("sellers").findOne({ userId }),
      database
        .collection("products")
        .find({ userId })
        .sort({ createdAt: -1 })
        .toArray(),
    ]);
    response.json({
      seller,
      products: products.map(({ _id, ...product }) => ({
        _id: _id.toString(),
        ...product,
      })),
    });
  } catch (error) {
    console.error("Failed to load seller dashboard", error);
    response.status(500).json({ error: "Failed to load seller dashboard." });
  }
});

app.post("/api/products", async (request, response) => {
  const { userId, ...product } = request.body || {};
  if (!userId || !product.productName || !product.category) {
    response.status(400).json({ error: "userId, category, and productName are required." });
    return;
  }

  try {
    const now = new Date();
    const result = await client.db(databaseName).collection("products").insertOne({
      ...product,
      userId,
      status: "published",
      createdAt: now,
      updatedAt: now,
    });
    response.status(201).json({ productId: result.insertedId.toString(), status: "published" });
  } catch (error) {
    console.error("Failed to publish product", error);
    response.status(500).json({ error: "Failed to publish product." });
  }
});

app.put("/api/products/:productId", async (request, response) => {
  const { productId } = request.params;
  const { userId, _id, ...product } = request.body || {};
  if (!userId || !ObjectId.isValid(productId) || !product.productName || !product.category) {
    response.status(400).json({ error: "userId, category, productName, and a valid productId are required." });
    return;
  }

  try {
    const result = await client.db(databaseName).collection("products").updateOne(
      { _id: new ObjectId(productId), userId },
      { $set: { ...product, status: "published", updatedAt: new Date() } },
    );
    if (!result.matchedCount) {
      response.status(404).json({ error: "Product not found." });
      return;
    }
    response.json({ productId, status: "published" });
  } catch (error) {
    console.error("Failed to update product", error);
    response.status(500).json({ error: "Failed to update product." });
  }
});

async function start() {
  await client.connect();
  await client.db(databaseName).command({ ping: 1 });
  app.listen(port, () => console.log(`Seller API listening on http://localhost:${port}`));
}

start().catch((error) => {
  console.error("Failed to start seller API", error);
  process.exit(1);
});

async function shutdown() {
  await client.close();
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
