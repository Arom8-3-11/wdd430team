import { Db, MongoClient } from "mongodb";

declare global {
  // Cached across hot reloads in development so we don't open a new
  // connection on every module reload.
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Copy studyconnect/.env.example to studyconnect/.env.local and fill in your MongoDB Atlas connection string.",
    );
  }

  if (!global._mongoClientPromise) {
    // Don't cache failed connections, otherwise a bad/changed MONGODB_URI
    // keeps replaying the old error until the server restarts.
    global._mongoClientPromise = new MongoClient(uri)
      .connect()
      .catch((error) => {
        global._mongoClientPromise = undefined;
        throw error;
      });
  }

  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB ?? "studyconnect");
}
