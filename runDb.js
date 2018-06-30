const db = require('./Mongo');

db.selectOne({isLight: true});
