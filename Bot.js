const Server = require('./server');
const config = require('./config.json');

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

// if (username === 'K_Sergey_V' || username === 'llemo'){
//     bot.sendMessage(id, `${msg.from.first_name}, давай загранку робить, заїбав!!!`);
// } else if (username === 'V_Yarosh') {
//     bot.sendMessage(id, `${msg.from.first_name}, хвате катать в доту, давай загранку роби!`);
//

bot.on('message', msg => {
    const {chat: {id}} = msg;
    const {chat: {username}} = msg;
    const {text} = msg;
    console.log(JSON.stringify(msg));
    if (text === '/start') {
        bot.sendMessage(id, 'Привіт, я алкобот, я ще тупий, і мою базу буде піднімать Влад, але ти можеш мені писать.)')
        bot.sendMessage(id, 'Може ти хочеш щось затестить?', openKeyboard)
    } else {}
});