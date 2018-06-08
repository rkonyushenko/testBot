const express = require('express');
const server = express();
const config = require('./config.json');
const bodyParser = require('body-parser');



class Server {
    createServer(bot){
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(bodyParser.json());

        server.listen(config.port, () => {
            console.log('We are listen port: ' + config.port);
        });

        server.post('/bot', (req, res) => {
            console.log(JSON.stringify(req.body));
            bot.processUpdate(req.body);
            res.sendStatus(200);
        })
    }
}

const apiServer = new Server;
module.exports = apiServer;



