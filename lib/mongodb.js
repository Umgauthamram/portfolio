import mongoose from "mongoose";

const ATLAS_URI = "mongodb+srv://gauthamramum_db_user:gautham1613@cluster0.h8xmrtu.mongodb.net/?appName=Cluster0";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    console.log("[MongoDB-v6.0] Attempting connection via ATLAS_URI...");

    if (cached.conn) {
        console.log("[MongoDB-v6.0] Using cached connection.");
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("[MongoDB-v6.0] Opening NEW connection...");
        const opts = {
            bufferCommands: false,
        };

        // WE ARE PASSING ATLAS_URI AS A STRING LITERAL HERE
        cached.promise = mongoose.connect(ATLAS_URI, opts).then((m) => {
            console.log("[MongoDB-v6.0] SUCCESS");
            return m;
        }).catch(e => {
            cached.promise = null;
            console.error("[MongoDB-v6.0] FAILED:", e.message);
            throw e;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDatabase;
