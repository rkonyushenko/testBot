const MongoClient = require('mongodb').MongoClient;
const json = require('./bot/dataDb.json')

const uri = `mongodb://lemo:qwerty123@ds161610.mlab.com:61610/botdb_alcho`;

class MongoDB {


    selectOne(condition) {
        return new Promise((resolve, reject) => {
            let data = {};
            MongoClient.connect(uri, function (err, client) {
                if (err) throw err;
                const collection = client.db("botdb_alcho").collection('alchoCollection');
                collection.find(condition).toArray((err, result) => {
                    if (err) throw err;
                    console.log(result);
                    data = result[0];
                })
            });
            resolve(data)
        })
    }
}

const mongo = new MongoDB();
module.exports = mongo;