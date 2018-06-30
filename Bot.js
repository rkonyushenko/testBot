const Server = require('./server');
const config = require('./config.json');
const botHelper = require('./bot/BotClass');

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
    if (text === '/start'){
        bot.sendMessage(id, 'Привіт, я алкобот, я ще тупий, і мою базу буде піднімать Влад, але ти можеш мені писать.)');
        bot.sendMessage(id, 'Може ти хочеш щось затестить?', openKeyboard);
    } else {
        if (botHelper.checkButtonPressed(text).hasOwnProperty([0]['text'])) {
            bot.sendMessage(id, botHelper.checkButtonPressed(text)[0]['text'], botHelper.checkButtonPressed(text)[1])
        } else {
            console.log(JSON.stringify(botHelper.checkButtonPressed(text)))
        }


    }





});