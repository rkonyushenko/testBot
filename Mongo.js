// const MongoClient = require('mongodb').MongoClient;
//
// const uri = `mongodb://lemo:qwerty123@ds161610.mlab.com:61610/botdb_alcho`;
//
// class MongoDB {
//
//     getConnection() {
//             MongoClient.connect(uri, function(err, client) {
//                 if (err) throw err;
//                const collection = client.db("botdb_alcho").collection('alchoCollection');
//                collection.insert({key: 'value'})418234096
//                console.log(collection)
//
//             });
//
//     }
// }
//
// const mongo = new MongoDB();
// module.exports = mongo;