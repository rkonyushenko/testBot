const Server = require('./server');
const config = require('./config.json');

const TelegramBot = require('node-telegram-bot-api');
const TOKEN = config.token;

const openKeyboard = {
    reply_markup: {
        keyboard: [
            ["Да, буду", "Нахуй пішов"],
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
    console.log(JSON.stringify(msg));
    if (username === 'K_Sergey_V'){
        bot.sendMessage(id, `${msg.from.first_name}, давай загранку робить, заїбав!!!`);
        bot.sendMessage(id, `Півос будеш?`, openKeyboard);
    } else if (username === 'V_Yarosh') {
        bot.sendMessage(id, `${msg.from.first_name}, хвате катать в доту, давай загранку роби!`);
    } else {
        bot.sendMessage(id, `Півос?`)
        if (msg.text === 'Нахуй пішов') {
            bot.sendSticker(id, 'CAADAgADOAADX8p-CzLiVfbJsCagAg')
        }
    }

});