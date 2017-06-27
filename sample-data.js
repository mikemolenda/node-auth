// Connect to DB instance
var conn = new Mongo("localhost:27017");
var db = conn.getDB("node-auth");

// Drop existing collections, if any
if (db.user.drop()) {
    print("- DROPPED COLLECTION user");
} else {
    print("! DID NOT DROP COLLECTION user");
}

// Create collections