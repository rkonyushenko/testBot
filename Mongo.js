const MongoClient = require('mongodb').MongoClient;
const json = require('./bot/dataDb.json')

const uri = `mongodb://lemo:qwerty123@ds161610.mlab.com:61610/botdb_alcho`;

class MongoDB {


    selectOne(condition) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(uri, function (err, client) {
                if (err) throw err;
                const collection = client.db("botdb_alcho").collection('alchoCollection');
                collection.find(condition)
                    .then(result => {
                        console.log(JSON.stringify(result));
                        resolve(result)
                    })
                    .catch(err => reject(err))
            })
        })
    }
}

const mongo = new MongoDB();
module.exports = mongo;