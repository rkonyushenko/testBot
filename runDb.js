const db = require('./Mongo');

db.selectOne({isDark: true});
