import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export interface UserDoc {
  _id: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Profile data that is safe to send to the signed-in student. */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  createdAt: string;
}

export function toProfile(user: UserDoc): UserProfile {
  // Deliberately excludes passwordHash and internal fields.
  return {
    id: user._id.toHexString(),
    name: user.name,
    email: user.email,
    bio: user.bio,
    createdAt: user.createdAt.toISOString(),
  };
}

async function usersCollection() {
  const db = await getDb();
  return db.collection<UserDoc>("users");
}

export async function findUserByEmail(email: string): Promise<UserDoc | null> {
  const users = await usersCollection();
  return users.findOne({ email: email.toLowerCase() });
}

export async function findUserById(id: string): Promise<UserDoc | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const users = await usersCollection();
  return users.findOne({ _id: new ObjectId(id) });
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<UserDoc> {
  const users = await usersCollection();
  const now = new Date();
  const doc: UserDoc = {
    _id: new ObjectId(),
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash: input.passwordHash,
    bio: "",
    createdAt: now,
    updatedAt: now,
  };
  await users.insertOne(doc);
  return doc;
}

export async function updateUserProfile(
  id: string,
  updates: { name: string; bio?: string },
): Promise<UserDoc | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const users = await usersCollection();
  return users.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        name: updates.name,
        ...(updates.bio !== undefined ? { bio: updates.bio } : {}),
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" },
  );
}
