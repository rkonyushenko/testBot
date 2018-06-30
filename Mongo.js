const MongoClient = require('mongodb').MongoClient;
const json = require('./bot/dataDb.json')

const uri = `mongodb://lemo:qwerty123@ds161610.mlab.com:61610/botdb_alcho`;

class MongoDB {


    selectOne(condition) {
        return new Promise((resolve, reject) => {
            let data = {};
            MongoClient.connect(uri,  (err, client) => {
                if (err) throw err;
                const collection = client.db("botdb_alcho").collection('alchoCollection');
                collection.find(condition).toArray((err, result) => {
                    if (err) throw err;
                    console.log(result[0]);
                    resolve(result[0])
                });
            });

        })
    }

    selectNext(condition, isNext = true) {
        return new Promise((resolve, reject) => {
            let index = 0;
            if (isNext){
                index++
            } else {
            }
            MongoClient.connect(uri,  (err, client) => {
                if (err) throw err;
                const collection = client.db("botdb_alcho").collection('alchoCollection');
                collection.find(condition).toArray((err, result) => {
                    if (err) throw err;
                    console.log(result[index]);
                    resolve([{text: result[index]}, {reply_markup: {
                            inline_keyboard: [
                                [{text: 'Next', callback_data: 'next'}]
                            ]
                        }}])
                });
            });

        })
    }
}

const mongo = new MongoDB();
module.exports = mongo;