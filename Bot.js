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

    eventEmitter.on('Пиво', () => {
        const keys = {
            reply_markup: {
                keyboard: [
                    ["Світле", "Темне"],
                ],
                one_time_keyboard: true,
                resize_keyboard: true
            }
        };
        bot.sendMessage(id, 'ммм, півос))) вибирай)', keys)
    });

    eventEmitter.on('Давай', () => {
        const keys = {
            reply_markup: {
                keyboard: [
                    ["Пиво", "Ель"],
                ],
                one_time_keyboard: true,
                resize_keyboard: true
            }
        };
        bot.sendMessage(id, 'Класно, вибирай', keys)
    });

    eventEmitter.on('Ні, давай без мене', () => {
        const keys = {
            reply_markup: {
                keyboard: [
                    ["Прощай"],
                ],
                one_time_keyboard: true,
                resize_keyboard: true
            }
        };
        bot.sendMessage(id, 'До зустрічі', keys)
    });

    eventEmitter.on('Світле', () => {
        return new Promise((resolve, reject) => {
            const condition = {type: 'beer',isLight: true};
            db.selectOne(condition)
                .then(result => {
                    console.log([{text: `Спробуй ${result.name}`}]);
                    bot.sendMessage(id, `Спробуй ${result.name}  ${result.description}`)
                })
                .catch(err => reject(err));
        });
    });

    eventEmitter.on('Темне', () => {
        return new Promise((resolve, reject) => {
            const condition = {type: 'beer',isDark: true};
            db.selectOne(condition)
                .then(result => {
                    console.log([{text: `Спробуй ${result.name}`}]);
                    bot.sendMessage(id, `Спробуй ${result.name}  ${result.description}`)
                })
                .catch(err => reject(err));
        });
    });

    eventEmitter.on('Ель', () => {
        return new Promise((resolve, reject) => {
            const condition = {type: 'ale'};
            db.selectOne(condition)
                .then(result => {
                    console.log([{text: `Спробуй ${result.name}`}]);
                    resolve ([{text: `Спробуй ${result.name}  ${result.description}`}, {reply_markup: {
                            inline_keyboard: [
                                [{text: 'Next', callback_data: 'next'}]
                            ]
                        }}])
                })
                .catch(err => reject(err));
        });
    });

});
const Emitter = require('events');
const eventEmitter = new Emitter();



bot.on('message',  msg => {
    console.log("callback_query is " + JSON.stringify(msg));
    eventEmitter.emit(msg.data);
    eventEmitter.emit(msg.text)

});
