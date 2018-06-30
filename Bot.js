const Server = require('./server');
const config = require('./config.json');
const botHelper = require('./bot/BotClass');
const db = require('./Mongo')

const EventEmitter = require('events');
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = config.token;

const openKeyboard = {
    reply_markup: {
        keyboard: [
            ["Давай", "Ні, давай без мене"],
        ],
        one_time_keyboard: true,
        resize_keyboard: true,
    },
};

const bot = new TelegramBot(TOKEN);
Server.createServer(bot);
bot.setWebHook(`${config.url}/bot`);

bot.on('message', msg => {
    const {chat: {id}} = msg;
    const {chat: {username}} = msg;
    const {text} = msg;
    console.log(JSON.stringify(msg));
    if (text === '/start') {
        bot.sendMessage(id, 'Привіт, я алкобот, я ще тупий, і мою базу буде піднімать Влад, але ти можеш мені писать.)');
        bot.sendMessage(id, 'Може ти хочеш щось затестить?', openKeyboard);
    } else {
        return new Promise((resolve, reject) => {
            botHelper.checkButtonPressed(text)
                .then(result => {
                    bot.sendMessage(id, JSON.stringify(result[0]['text']), result[1]);
                })
                .catch(err => reject(err))

        })
    }
    eventEmitter.on('next', () => {
        return new Promise((resolve, reject) => {
            db.selectNext({type: 'ale'}, true)
                .then(result => {
                    bot.editMessageText(id, JSON.stringify(result[0]['text'], result[1]))
                    resolve(result)
                })
                .catch(err => reject(err))
        })
    });
});
const Emitter = require('events');
const eventEmitter = new Emitter();

eventEmitter.on('Пиво', () => {
    console.log('dsnfkjdsnfkdsajnfpsajnfdskjnfkdsnfkdsjnfkjdsnfkjdsanfkjdsanfdskjfndskajfnkjdsa')
    // return new Promise((resolve, reject) => {
    //     db.selectNext({type: 'ale'}, true)
    //         .then(result => {
    //             bot.editMessageText(id, JSON.stringify(result[0]['text'], result[1]))
    //             resolve(result)
    //         })
    //         .catch(err => reject(err))
    // })
});

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    console.log("callback_query is " + JSON.stringify(callbackQuery));
    eventEmitter.emit(callbackQuery.data);
    eventEmitter.emit(callbackQuery.text)

});
