// Connect to DB instance
var conn = new Mongo('localhost:27017');
var db = conn.getDB('nodeauth');

// Drop existing collections, if any
if (db.users.drop()) {
    print('Dropped collection users');
} else {
    print('Drop collection users failed or users does not exist');
}

// Create collections
db.users.insert({name: 'Guy Incognito', email: 'test@test.com', username: 'test', password: 'abc123'});

