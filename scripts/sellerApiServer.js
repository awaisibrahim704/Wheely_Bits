import "dotenv/config";
import cors from "cors";
import express from "express";
import { createHash, timingSafeEqual } from "node:crypto";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = Number(process.env.SELLER_API_PORT || 4000);
const mongoUri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DATABASE || "wheelybits";
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...(process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
]);

if (!mongoUri) {
  console.error("MONGODB_URI is required to start the seller API.");
  process.exit(1);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin ${origin} is not allowed by seller API CORS.`));
    },
  }),
);
app.use(express.json({ limit: "20mb" }));

const client = new MongoClient(mongoUri);

const SEED_RATINGS = [
  {
    sellerId: "automax-wheels",
    userId: "buyer-seed-1",
    userName: "Hamza Malik",
    stars: 5,
    comment:
      "Spot on fitment for my Civic FL5. Fitted 19×9.5 Volk TE37s with Michelin Pilot Sport 4S. AutoMax checked Brembo caliper clearance beforehand and laser balancing was millimeter perfect.",
    car: "Honda Civic Type R (FL5)",
    createdAt: new Date(Date.now() - 86400000 * 3),
    updatedAt: new Date(Date.now() - 86400000 * 3),
  },
  {
    sellerId: "automax-wheels",
    userId: "buyer-seed-2",
    userName: "Taimoor Raza",
    stars: 5,
    comment:
      "Genuine BBS LM rims with fast 24-hour insured courier delivery to Lahore. Arrived boxed in original packaging with inspection certificates. Outstanding customer support on WhatsApp!",
    car: "BMW M340i · Lahore",
    createdAt: new Date(Date.now() - 86400000 * 7),
    updatedAt: new Date(Date.now() - 86400000 * 7),
  },
  {
    sellerId: "automax-wheels",
    userId: "buyer-seed-3",
    userName: "Zayn Shah",
    stars: 4,
    comment:
      "Great selection of premium tyres. Got Yokohama Advan Neova AD09 installed. Professional laser alignment and quick service.",
    car: "Toyota GR Yaris",
    createdAt: new Date(Date.now() - 86400000 * 14),
    updatedAt: new Date(Date.now() - 86400000 * 14),
  },
  {
    sellerId: "stancecraft",
    userId: "buyer-sc-1",
    userName: "Bilal Tariq",
    stars: 5,
    car: "VW Golf GTI MK7.5",
    comment:
      "Installed Airlift Performance 3P suspension with hidden tank management. Absolutely clean trunk installation, zero air leaks, and rides like a dream. Top-tier stance shop in the twin cities!",
    createdAt: new Date(Date.now() - 86400000 * 2),
    updatedAt: new Date(Date.now() - 86400000 * 2),
  },
  {
    sellerId: "stancecraft",
    userId: "buyer-sc-2",
    userName: "Daniyal Qureshi",
    stars: 5,
    car: "Nissan 350z HR · Islamabad",
    comment:
      "Exceptional fitment consulting. They measured wheel offset and camber angle with digital lasers before ordering my Work Meister wheels. StanceCraft is the real deal in Islamabad.",
    createdAt: new Date(Date.now() - 86400000 * 6),
    updatedAt: new Date(Date.now() - 86400000 * 6),
  },
  {
    sellerId: "stancecraft",
    userId: "buyer-sc-3",
    userName: "Saad Farooq",
    stars: 4,
    car: "Honda Civic Turbo RS",
    comment:
      "Got 15mm hubcentric forged wheel spacers with extended ARP studs. Zero vibrations even at 160 km/h on the motorway. Solid workmanship.",
    createdAt: new Date(Date.now() - 86400000 * 12),
    updatedAt: new Date(Date.now() - 86400000 * 12),
  },
  {
    sellerId: "aura-custom",
    userId: "buyer-aura-1",
    userName: "Fahad Mustafa",
    stars: 5,
    car: "Audi RS5 Sportback",
    comment:
      "Complete Inozetek Super Gloss wrap + Avery Supreme ceramic window tint. Edges are tucked meticulously, not a single crease or bubble anywhere. Truly Islamabad's premiere vinyl studio.",
    createdAt: new Date(Date.now() - 86400000 * 4),
    updatedAt: new Date(Date.now() - 86400000 * 4),
  },
  {
    sellerId: "aura-custom",
    userId: "buyer-aura-2",
    userName: "Ali Rehman",
    stars: 5,
    car: "Porsche Cayman 718",
    comment:
      "Self-healing TPU paint protection film on front bumper, hood, and fenders. You can't even tell it's wrapped. Unmatched craftsmanship.",
    createdAt: new Date(Date.now() - 86400000 * 10),
    updatedAt: new Date(Date.now() - 86400000 * 10),
  },
];

// ── Helper: resolve seller identities (userId and vendor slug) ───────────
async function getSellerIdentities(database, sellerId) {
  if (!sellerId) return [];
  const ids = new Set([sellerId]);
  if (sellerId === "automax-wheels") {
    const firstSeller = await database.collection("sellers").findOne({});
    if (firstSeller?.userId) ids.add(firstSeller.userId);
  } else {
    const seller = await database.collection("sellers").findOne({ userId: sellerId });
    if (seller) ids.add("automax-wheels");
  }
  return Array.from(ids);
}

// ── Helper: ensure seed ratings exist ─────────────────────────────────────
let seedRatingsDone = false;
async function ensureSeedRatings(database) {
  if (seedRatingsDone) return;
  try {
    for (const seed of SEED_RATINGS) {
      const exists = await database.collection("ratings").findOne({
        sellerId: seed.sellerId,
        userId: seed.userId,
      });
      if (!exists) {
        await database.collection("ratings").insertOne(seed);
      }
    }
    seedRatingsDone = true;
  } catch (err) {
    console.error("Failed to seed ratings:", err);
  }
}

// ── Helper: compute average rating for a sellerId ──────────────────────────
async function getRatingSummary(database, sellerId) {
  await ensureSeedRatings(database);
  const identities = await getSellerIdentities(database, sellerId);
  const ratings = await database
    .collection("ratings")
    .find({ sellerId: { $in: identities.length > 0 ? identities : [sellerId] } })
    .toArray();
  if (ratings.length === 0) return { averageRating: 5.0, totalRatings: 0, breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
  const total = ratings.reduce((sum, r) => sum + r.stars, 0);
  const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ratings.forEach((r) => {
    const s = Math.min(5, Math.max(1, Math.round(r.stars)));
    breakdown[s] = (breakdown[s] || 0) + 1;
  });
  return {
    averageRating: Math.round((total / ratings.length) * 10) / 10,
    totalRatings: ratings.length,
    breakdown,
  };
}

// ── Health ──────────────────────────────────────────────────────────────────
app.get("/api/health", async (_request, response) => {
  try {
    await client.db(databaseName).command({ ping: 1 });
    response.json({ ok: true, database: databaseName });
  } catch {
    response.status(503).json({ ok: false, error: "MongoDB is unavailable." });
  }
});

// ── Marketplace (public) ────────────────────────────────────────────────────
app.get("/api/marketplace", async (_request, response) => {
  try {
    const database = client.db(databaseName);
    const [sellerRecord, sellerRecords, products] = await Promise.all([
      database.collection("sellers").findOne({}, { projection: { _id: 0 } }),
      database.collection("sellers").find({}, {
        projection: { _id: 0, userId: 1, businessName: 1, store: 1 },
      }).toArray(),
      database.collection("products").find({ status: "published" }).sort({ createdAt: -1 }).toArray(),
    ]);
    const sellersById = new Map(sellerRecords.map((seller) => [seller.userId, seller]));

    const sellerId = sellerRecord?.userId || null;
    const ratingSummary = sellerId ? await getRatingSummary(database, sellerId) : { averageRating: null, totalRatings: 0 };

    response.json({
      seller: sellerRecord ? (({ userId: _sellerId, ...seller }) => seller)(sellerRecord) : null,
      sellerId,
      averageRating: ratingSummary.averageRating,
      totalRatings: ratingSummary.totalRatings,
      products: products.map(({ _id, ...product }) => ({
        _id: _id.toString(),
        ...product,
        vendorName:
          sellersById.get(product.userId)?.store?.businessName ||
          sellersById.get(product.userId)?.businessName,
        vendorLocation:
          sellersById.get(product.userId)?.store?.address ||
          sellersById.get(product.userId)?.store?.city,
        price: Number(product.price) || 0,
        stock: Number(product.stock) || 0,
        gallery: Array.isArray(product.gallery) ? product.gallery : [],
      })),
    });
  } catch (error) {
    console.error("Failed to load marketplace", error);
    response.status(500).json({ error: "Failed to load marketplace." });
  }
});

// ── Community posts ────────────────────────────────────────────────────────
const communityPostCollection = () => client.db(databaseName).collection("communityPosts");

function serializeCommunityPost(post) {
  return {
    id: post._id.toString(),
    userId: post.userId,
    author: post.author,
    description: post.description,
    images: Array.isArray(post.images)
      ? post.images
      : post.image
        ? [post.image]
        : [],
    createdAt: post.createdAt,
    likedBy: post.likedBy || [],
    comments: post.comments || [],
  };
}

app.get("/api/community/posts", async (_request, response) => {
  try {
    const posts = await communityPostCollection()
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();
    response.json({ posts: posts.map(serializeCommunityPost) });
  } catch (error) {
    console.error("Failed to load community posts", error);
    response.status(500).json({ error: "Failed to load community posts." });
  }
});

app.post("/api/community/posts", async (request, response) => {
  const { userId, author, description, images } = request.body || {};
  if (
    typeof userId !== "string" ||
    !userId.trim() ||
    typeof author !== "string" ||
    !author.trim() ||
    typeof description !== "string" ||
    !description.trim() ||
    description.length > 2000 ||
    !Array.isArray(images) ||
    images.length < 1 ||
    images.length > 5 ||
    images.some((image) => typeof image !== "string" || !image.startsWith("data:image/")) ||
    images.reduce((total, image) => total + image.length, 0) > 12_000_000
  ) {
    response.status(400).json({ error: "A description and valid image are required." });
    return;
  }

  try {
    const post = {
      userId: userId.trim(),
      author: author.trim().slice(0, 80),
      description: description.trim(),
      images,
      createdAt: new Date().toISOString(),
      likedBy: [],
      comments: [],
    };
    const result = await communityPostCollection().insertOne(post);
    response.status(201).json({ post: serializeCommunityPost({ ...post, _id: result.insertedId }) });
  } catch (error) {
    console.error("Failed to create community post", error);
    response.status(500).json({ error: "Failed to create community post." });
  }
});

app.post("/api/community/posts/:postId/reactions", async (request, response) => {
  const { postId } = request.params;
  const { userId } = request.body || {};
  if (!ObjectId.isValid(postId) || typeof userId !== "string" || !userId.trim()) {
    response.status(400).json({ error: "A valid post and user are required." });
    return;
  }

  try {
    const collection = communityPostCollection();
    const _id = new ObjectId(postId);
    const post = await collection.findOne({ _id });
    if (!post) {
      response.status(404).json({ error: "Community post not found." });
      return;
    }
    const likedBy = post.likedBy || [];
    if (likedBy.includes(userId)) {
      await collection.updateOne({ _id }, { $pull: { likedBy: userId } });
    } else {
      await collection.updateOne({ _id }, { $addToSet: { likedBy: userId } });
    }
    const updated = await collection.findOne({ _id });
    response.json({ post: serializeCommunityPost(updated) });
  } catch (error) {
    console.error("Failed to react to community post", error);
    response.status(500).json({ error: "Failed to react to community post." });
  }
});

app.post("/api/community/posts/:postId/comments", async (request, response) => {
  const { postId } = request.params;
  const { userId, author, content } = request.body || {};
  if (
    !ObjectId.isValid(postId) ||
    typeof userId !== "string" ||
    !userId.trim() ||
    typeof author !== "string" ||
    !author.trim() ||
    typeof content !== "string" ||
    !content.trim() ||
    content.length > 1000
  ) {
    response.status(400).json({ error: "A comment is required." });
    return;
  }

  try {
    const collection = communityPostCollection();
    const _id = new ObjectId(postId);
    const comment = {
      id: new ObjectId().toString(),
      userId: userId.trim(),
      author: author.trim().slice(0, 80),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };
    const result = await collection.updateOne(
      { _id },
      { $push: { comments: comment } },
    );
    if (!result.matchedCount) {
      response.status(404).json({ error: "Community post not found." });
      return;
    }
    const updated = await collection.findOne({ _id });
    response.json({ post: serializeCommunityPost(updated) });
  } catch (error) {
    console.error("Failed to comment on community post", error);
    response.status(500).json({ error: "Failed to add comment." });
  }
});

app.delete("/api/community/posts/:postId", async (request, response) => {
  const { postId } = request.params;
  const { userId } = request.body || {};
  if (!ObjectId.isValid(postId) || typeof userId !== "string" || !userId.trim()) {
    response.status(400).json({ error: "A valid post and user are required." });
    return;
  }

  try {
    const collection = communityPostCollection();
    const _id = new ObjectId(postId);
    const post = await collection.findOne({ _id });
    if (!post) {
      response.status(404).json({ error: "Community post not found." });
      return;
    }
    if (post.userId !== userId.trim()) {
      response.status(403).json({ error: "You can only delete your own posts." });
      return;
    }
    await collection.deleteOne({ _id });
    response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete community post", error);
    response.status(500).json({ error: "Failed to delete community post." });
  }
});

// ── Community discussions ──────────────────────────────────────────────────
const communityDiscussionCollection = () => client.db(databaseName).collection("communityDiscussions");

function serializeCommunityDiscussion(discussion) {
  return {
    id: discussion._id.toString(),
    userId: discussion.userId,
    author: discussion.author,
    title: discussion.title,
    category: discussion.category,
    content: discussion.content,
    createdAt: discussion.createdAt,
    lastActivityAt: discussion.lastActivityAt || discussion.createdAt,
    replies: discussion.replies || [],
  };
}

app.get("/api/community/discussions", async (_request, response) => {
  try {
    const discussions = await communityDiscussionCollection()
      .find({})
      .sort({ lastActivityAt: -1, createdAt: -1 })
      .limit(100)
      .toArray();
    response.json({ discussions: discussions.map(serializeCommunityDiscussion) });
  } catch (error) {
    console.error("Failed to load community discussions", error);
    response.status(500).json({ error: "Failed to load community discussions." });
  }
});

app.get("/api/community/discussions/:discussionId", async (request, response) => {
  const { discussionId } = request.params;
  if (!ObjectId.isValid(discussionId)) {
    response.status(400).json({ error: "A valid discussion is required." });
    return;
  }

  try {
    const discussion = await communityDiscussionCollection().findOne({
      _id: new ObjectId(discussionId),
    });
    if (!discussion) {
      response.status(404).json({ error: "Discussion not found." });
      return;
    }
    response.json({ discussion: serializeCommunityDiscussion(discussion) });
  } catch (error) {
    console.error("Failed to load community discussion", error);
    response.status(500).json({ error: "Failed to load community discussion." });
  }
});

app.put("/api/community/discussions/:discussionId/author", async (request, response) => {
  const { discussionId } = request.params;
  const { userId, author } = request.body || {};
  if (
    !ObjectId.isValid(discussionId) ||
    typeof userId !== "string" || !userId.trim() ||
    typeof author !== "string" || !author.trim() || author.length > 80
  ) {
    response.status(400).json({ error: "A valid user and display name are required." });
    return;
  }

  try {
    const collection = communityDiscussionCollection();
    const _id = new ObjectId(discussionId);
    const result = await collection.updateOne(
      { _id, userId: userId.trim() },
      {
        $set: {
          author: author.trim(),
          "replies.$[reply].author": author.trim(),
        },
      },
      { arrayFilters: [{ "reply.userId": userId.trim() }] },
    );
    if (!result.matchedCount) {
      response.status(404).json({ error: "Your discussion was not found." });
      return;
    }
    const discussion = await collection.findOne({ _id });
    response.json({ discussion: serializeCommunityDiscussion(discussion) });
  } catch (error) {
    console.error("Failed to update community discussion author", error);
    response.status(500).json({ error: "Failed to update your display name." });
  }
});

app.post("/api/community/discussions", async (request, response) => {
  const { userId, author, title, category, content } = request.body || {};
  if (
    typeof userId !== "string" || !userId.trim() ||
    typeof author !== "string" || !author.trim() ||
    typeof title !== "string" || !title.trim() || title.length > 140 ||
    typeof category !== "string" || !category.trim() ||
    typeof content !== "string" || !content.trim() || content.length > 4000
  ) {
    response.status(400).json({ error: "A title, category, and discussion are required." });
    return;
  }

  try {
    const createdAt = new Date().toISOString();
    const discussion = {
      userId: userId.trim(),
      author: author.trim().slice(0, 80),
      title: title.trim(),
      category: category.trim().slice(0, 60),
      content: content.trim(),
      createdAt,
      lastActivityAt: createdAt,
      replies: [],
    };
    const result = await communityDiscussionCollection().insertOne(discussion);
    response.status(201).json({
      discussion: serializeCommunityDiscussion({ ...discussion, _id: result.insertedId }),
    });
  } catch (error) {
    console.error("Failed to create community discussion", error);
    response.status(500).json({ error: "Failed to create community discussion." });
  }
});

app.post("/api/community/discussions/:discussionId/replies", async (request, response) => {
  const { discussionId } = request.params;
  const { userId, author, content } = request.body || {};
  if (
    !ObjectId.isValid(discussionId) ||
    typeof userId !== "string" || !userId.trim() ||
    typeof author !== "string" || !author.trim() ||
    typeof content !== "string" || !content.trim() || content.length > 2000
  ) {
    response.status(400).json({ error: "A valid reply is required." });
    return;
  }

  try {
    const collection = communityDiscussionCollection();
    const _id = new ObjectId(discussionId);
    const reply = {
      id: new ObjectId().toString(),
      userId: userId.trim(),
      author: author.trim().slice(0, 80),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };
    const lastActivityAt = new Date().toISOString();
    const result = await collection.updateOne(
      { _id },
      { $push: { replies: reply }, $set: { lastActivityAt } },
    );
    if (!result.matchedCount) {
      response.status(404).json({ error: "Discussion not found." });
      return;
    }
    const discussion = await collection.findOne({ _id });
    response.json({ discussion: serializeCommunityDiscussion(discussion) });
  } catch (error) {
    console.error("Failed to add discussion reply", error);
    response.status(500).json({ error: "Failed to add discussion reply." });
  }
});

// ── Submit Rating ──────────────────────────────────────────────────────────
app.post("/api/ratings", async (request, response) => {
  const { sellerId, userId, userName, stars, comment, car, photos } = request.body || {};
  if (!sellerId || !userId || !stars || stars < 1 || stars > 5) {
    response.status(400).json({ error: "sellerId, userId, and stars (1–5) are required." });
    return;
  }
  if (
    photos !== undefined &&
    (!Array.isArray(photos) ||
      photos.length > 5 ||
      photos.some(
        (photo) =>
          typeof photo !== "string" ||
          !/^data:image\/(?:jpeg|png|webp);base64,[a-z0-9+/]+=*$/i.test(photo) ||
          photo.length > 2_000_000,
      ))
  ) {
    response.status(400).json({ error: "Upload up to 5 valid photos, each no larger than 1.5 MB." });
    return;
  }

  try {
    const database = client.db(databaseName);
    const now = new Date();
    const identities = await getSellerIdentities(database, sellerId);
    const targetIdentities = identities.length > 0 ? identities : [sellerId];

    const existing = await database.collection("ratings").findOne({
      sellerId: { $in: targetIdentities },
      userId,
    });

    if (existing) {
      await database.collection("ratings").updateOne(
        { _id: existing._id },
        {
          $set: {
            sellerId,
            userName: userName || existing.userName || "Customer",
            stars: Math.min(5, Math.max(1, Math.round(stars))),
            comment: comment !== undefined ? comment : existing.comment,
            car: car !== undefined ? car : existing.car,
            photos: photos !== undefined ? photos : existing.photos || [],
            updatedAt: now,
          },
        },
      );
    } else {
      await database.collection("ratings").insertOne({
        sellerId,
        userId,
        userName: userName || "Customer",
        stars: Math.min(5, Math.max(1, Math.round(stars))),
        comment: comment || "",
        car: car || "",
        photos: photos || [],
        createdAt: now,
        updatedAt: now,
      });
    }

    const summary = await getRatingSummary(database, sellerId);
    response.status(201).json({ success: true, ...summary });
  } catch (error) {
    console.error("Failed to save rating", error);
    response.status(500).json({ error: "Failed to save rating." });
  }
});

// ── Get Ratings for a Seller ────────────────────────────────────────────────
app.get("/api/sellers/:sellerId/ratings", async (request, response) => {
  const { sellerId } = request.params;
  if (!sellerId) {
    response.status(400).json({ error: "sellerId is required." });
    return;
  }

  try {
    const database = client.db(databaseName);
    await ensureSeedRatings(database);
    const identities = await getSellerIdentities(database, sellerId);
    const targetIdentities = identities.length > 0 ? identities : [sellerId];
    const [ratings, summary] = await Promise.all([
      database
        .collection("ratings")
        .find({ sellerId: { $in: targetIdentities } })
        .sort({ updatedAt: -1 })
        .limit(100)
        .toArray(),
      getRatingSummary(database, sellerId),
    ]);

    response.json({
      ...summary,
      ratings: ratings.map(({ _id, ...r }) => ({ _id: _id.toString(), ...r })),
    });
  } catch (error) {
    console.error("Failed to load ratings", error);
    response.status(500).json({ error: "Failed to load ratings." });
  }
});

// ── Get My Rating (for a user on a seller) ─────────────────────────────────
app.get("/api/ratings/:sellerId/:userId", async (request, response) => {
  const { sellerId, userId } = request.params;
  try {
    const database = client.db(databaseName);
    const identities = await getSellerIdentities(database, sellerId);
    const targetIdentities = identities.length > 0 ? identities : [sellerId];
    const rating = await database
      .collection("ratings")
      .findOne({ sellerId: { $in: targetIdentities }, userId });
    response.json({
      rating: rating
        ? {
            stars: rating.stars,
            comment: rating.comment || "",
            car: rating.car || "",
            photos: rating.photos || [],
          }
        : null,
    });
  } catch (error) {
    console.error("Failed to fetch user rating", error);
    response.status(500).json({ error: "Failed to fetch rating." });
  }
});

// ── Inquiries ───────────────────────────────────────────────────────────────
app.post("/api/inquiries", async (request, response) => {
  const { sellerId, productId, productName, senderName, senderPhone, car, message, conversationToken } = request.body || {};
  if (
    typeof sellerId !== "string" || !sellerId.trim() ||
    typeof senderName !== "string" || !senderName.trim() ||
    typeof senderPhone !== "string" || !senderPhone.trim() ||
    typeof message !== "string" || !message.trim() || message.length > 500 ||
    typeof conversationToken !== "string" || !/^[a-f0-9]{64}$/i.test(conversationToken)
  ) {
    response.status(400).json({ error: "Seller, name, phone, a message up to 500 characters, and a valid conversation token are required." });
    return;
  }

  try {
    const now = new Date();
    const firstMessage = {
      sender: "customer",
      content: message.trim(),
      createdAt: now,
    };
    const result = await client.db(databaseName).collection("inquiries").insertOne({
      sellerId: sellerId.trim(),
      productId: productId || null,
      productName: productName || null,
      senderName: senderName.trim().slice(0, 100),
      senderPhone: senderPhone.trim().slice(0, 40),
      car: typeof car === "string" ? car.trim().slice(0, 120) : null,
      message: message.trim(),
      messages: [firstMessage],
      conversationTokenHash: createHash("sha256").update(conversationToken).digest("hex"),
      status: "unread",
      createdAt: now,
      updatedAt: now,
    });
    response.status(201).json({ inquiryId: result.insertedId.toString(), status: "unread" });
  } catch (error) {
    console.error("Failed to save inquiry", error);
    response.status(500).json({ error: "Failed to save inquiry." });
  }
});

app.get("/api/inquiries/:inquiryId/conversation", async (request, response) => {
  const { inquiryId } = request.params;
  const token = request.get("X-Conversation-Token");
  if (!ObjectId.isValid(inquiryId) || typeof token !== "string" || !/^[a-f0-9]{64}$/i.test(token)) {
    response.status(400).json({ error: "A valid conversation is required." });
    return;
  }

  try {
    const inquiry = await client.db(databaseName).collection("inquiries").findOne({
      _id: new ObjectId(inquiryId),
    });
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const storedHash = inquiry?.conversationTokenHash;
    const validToken = typeof storedHash === "string" &&
      storedHash.length === tokenHash.length &&
      timingSafeEqual(Buffer.from(storedHash), Buffer.from(tokenHash));
    if (!inquiry || !validToken) {
      response.status(404).json({ error: "Conversation not found or access is unavailable on this device." });
      return;
    }
    const { conversationTokenHash: _tokenHash, ...safeInquiry } = inquiry;
    response.json({
      inquiry: {
        ...safeInquiry,
        _id: inquiry._id.toString(),
        messages: inquiry.messages || [{
          sender: "customer",
          content: inquiry.message,
          createdAt: inquiry.createdAt,
        }],
      },
    });
  } catch (error) {
    console.error("Failed to load inquiry conversation", error);
    response.status(500).json({ error: "Failed to load conversation." });
  }
});

app.post("/api/inquiries/:inquiryId/conversation", async (request, response) => {
  const { inquiryId } = request.params;
  const token = request.get("X-Conversation-Token");
  const { content } = request.body || {};
  if (
    !ObjectId.isValid(inquiryId) ||
    typeof token !== "string" || !/^[a-f0-9]{64}$/i.test(token) ||
    typeof content !== "string" || !content.trim() || content.length > 1000
  ) {
    response.status(400).json({ error: "A valid conversation and message up to 1,000 characters are required." });
    return;
  }

  try {
    const collection = client.db(databaseName).collection("inquiries");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const inquiry = await collection.findOne({ _id: new ObjectId(inquiryId) });
    const storedHash = inquiry?.conversationTokenHash;
    const validToken = typeof storedHash === "string" &&
      storedHash.length === tokenHash.length &&
      timingSafeEqual(Buffer.from(storedHash), Buffer.from(tokenHash));
    if (!inquiry || !validToken) {
      response.status(404).json({ error: "Conversation not found or access is unavailable on this device." });
      return;
    }

    const message = {
      sender: "customer",
      content: content.trim(),
      createdAt: new Date(),
    };
    await collection.updateOne(
      { _id: new ObjectId(inquiryId), conversationTokenHash: tokenHash },
      { $push: { messages: message }, $set: { status: "unread", updatedAt: message.createdAt } },
    );
    response.status(201).json({ message });
  } catch (error) {
    console.error("Failed to send customer reply", error);
    response.status(500).json({ error: "Failed to send reply." });
  }
});

app.post("/api/inquiries/:inquiryId/replies", async (request, response) => {
  const { inquiryId } = request.params;
  const { userId, content } = request.body || {};
  if (
    !ObjectId.isValid(inquiryId) ||
    typeof userId !== "string" || !userId.trim() ||
    typeof content !== "string" || !content.trim() || content.length > 1000
  ) {
    response.status(400).json({ error: "A valid seller and message up to 1,000 characters are required." });
    return;
  }

  try {
    const database = client.db(databaseName);
    const sellerIdentities = await getSellerIdentities(database, userId.trim());
    const message = {
      sender: "seller",
      content: content.trim(),
      createdAt: new Date(),
    };
    const result = await database.collection("inquiries").updateOne(
      {
        _id: new ObjectId(inquiryId),
        sellerId: { $in: sellerIdentities.length ? sellerIdentities : [userId.trim()] },
      },
      { $push: { messages: message }, $set: { status: "replied", updatedAt: message.createdAt } },
    );
    if (!result.matchedCount) {
      response.status(404).json({ error: "Inquiry not found for this seller." });
      return;
    }
    response.status(201).json({ message });
  } catch (error) {
    console.error("Failed to send seller reply", error);
    response.status(500).json({ error: "Failed to send reply." });
  }
});

// ── Seller Profile (upsert) ─────────────────────────────────────────────────
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

// ── Seller Dashboard ────────────────────────────────────────────────────────
app.get("/api/sellers/:userId/inquiries", async (request, response) => {
  const { userId } = request.params;
  if (!userId) {
    response.status(400).json({ error: "userId is required." });
    return;
  }
  try {
    const database = client.db(databaseName);
    const identities = await getSellerIdentities(database, userId);
    const inquiries = await database.collection("inquiries")
      .find({ sellerId: { $in: identities.length ? identities : [userId] } })
      .sort({ updatedAt: -1 })
      .toArray();
    response.json({
      inquiries: inquiries.map(({ _id, conversationTokenHash: _tokenHash, ...inquiry }) => ({
        _id: _id.toString(),
        ...inquiry,
      })),
    });
  } catch (error) {
    console.error("Failed to refresh seller inquiries", error);
    response.status(500).json({ error: "Failed to refresh seller inquiries." });
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
    const identities = await getSellerIdentities(database, userId);
    const targetIdentities = identities.length > 0 ? identities : [userId];
    const [seller, products, inquiries, ratingSummary, recentRatings] = await Promise.all([
      database.collection("sellers").findOne({ userId }),
      database.collection("products").find({ userId }).sort({ createdAt: -1 }).toArray(),
      database.collection("inquiries").find({ sellerId: { $in: targetIdentities } }).sort({ createdAt: -1 }).toArray(),
      getRatingSummary(database, userId),
      database.collection("ratings").find({ sellerId: { $in: targetIdentities } }).sort({ updatedAt: -1 }).limit(50).toArray(),
    ]);
    response.json({
      seller,
      products: products.map(({ _id, ...product }) => ({
        _id: _id.toString(),
        ...product,
      })),
      inquiries: inquiries.map(({ _id, conversationTokenHash: _tokenHash, ...inquiry }) => ({
        _id: _id.toString(),
        ...inquiry,
      })),
      ratingSummary,
      recentRatings: recentRatings.map(({ _id, ...r }) => ({ _id: _id.toString(), ...r })),
    });
  } catch (error) {
    console.error("Failed to load seller dashboard", error);
    response.status(500).json({ error: "Failed to load seller dashboard." });
  }
});

// ── Inquiry Status Update ───────────────────────────────────────────────────
app.patch("/api/inquiries/:inquiryId", async (request, response) => {
  const { inquiryId } = request.params;
  const { userId, status } = request.body || {};
  if (!userId || !ObjectId.isValid(inquiryId) || !["unread", "read", "replied"].includes(status)) {
    response.status(400).json({ error: "userId, valid inquiryId, and a supported status are required." });
    return;
  }
  try {
    const result = await client.db(databaseName).collection("inquiries").updateOne(
      { _id: new ObjectId(inquiryId), sellerId: userId },
      { $set: { status, updatedAt: new Date() } },
    );
    if (!result.matchedCount) {
      response.status(404).json({ error: "Inquiry not found." });
      return;
    }
    response.json({ inquiryId, status });
  } catch (error) {
    console.error("Failed to update inquiry", error);
    response.status(500).json({ error: "Failed to update inquiry." });
  }
});

// ── Products ────────────────────────────────────────────────────────────────
function normalizeProductIdentity(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function getRimListingKey(product) {
  if (!/(rim|wheel)/.test(String(product.category || "").toLowerCase())) {
    return null;
  }

  const identity = `${normalizeProductIdentity(product.brand)}:${normalizeProductIdentity(product.productName)}`;
  return `rim:${createHash("sha256").update(identity).digest("hex")}`;
}

app.post("/api/products", async (request, response) => {
  const { userId, ...product } = request.body || {};
  if (!userId || !product.productName || !product.category) {
    response.status(400).json({ error: "userId, category, and productName are required." });
    return;
  }

  try {
    const products = client.db(databaseName).collection("products");
    const listingKey = getRimListingKey(product);
    if (listingKey) {
      const existingListings = await products
        .find(
          { userId, status: "published", category: { $regex: "(rim|wheel)", $options: "i" } },
          { projection: { brand: 1, productName: 1 } },
        )
        .toArray();
      const normalizedIdentity =
        `${normalizeProductIdentity(product.brand)}:${normalizeProductIdentity(product.productName)}`;
      const isDuplicate = existingListings.some(
        (existing) =>
          `${normalizeProductIdentity(existing.brand)}:${normalizeProductIdentity(existing.productName)}` ===
          normalizedIdentity,
      );
      if (isDuplicate) {
        response.status(409).json({
          error: "This rim is already published in your listings.",
        });
        return;
      }
    }

    const now = new Date();
    const result = await products.insertOne({
      ...product,
      userId,
      ...(listingKey ? { listingKey } : {}),
      status: "published",
      createdAt: now,
      updatedAt: now,
    });
    response.status(201).json({ productId: result.insertedId.toString(), status: "published" });
  } catch (error) {
    if (error?.code === 11000) {
      response.status(409).json({
        error: "This rim is already published in your listings.",
      });
      return;
    }
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

app.delete("/api/products/:productId", async (request, response) => {
  const { productId } = request.params;
  const { userId } = request.body || {};
  if (!userId || !ObjectId.isValid(productId)) {
    response.status(400).json({
      error: "A signed-in seller and valid productId are required.",
    });
    return;
  }

  try {
    const result = await client.db(databaseName).collection("products").deleteOne({
      _id: new ObjectId(productId),
      userId,
    });
    if (!result.deletedCount) {
      response.status(404).json({ error: "Product not found." });
      return;
    }
    response.json({ productId, status: "deleted" });
  } catch (error) {
    console.error("Failed to delete product", error);
    response.status(500).json({ error: "Failed to delete product." });
  }
});

// ── Start ───────────────────────────────────────────────────────────────────
async function start() {
  await client.connect();
  await client.db(databaseName).command({ ping: 1 });
  await client.db(databaseName).collection("products").createIndex(
    { userId: 1, listingKey: 1 },
    {
      unique: true,
      partialFilterExpression: { listingKey: { $type: "string" } },
    },
  );
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
