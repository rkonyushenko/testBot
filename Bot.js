const Server = require('./server');
const config = require('./config.json');

const TelegramBot = require('node-telegram-bot-api');
const TOKEN = config.token;

const openKeyboard = {
    reply_markup: {
        keyboard: [
            ["Test", "Test_2"],
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
    console.log(JSON.stringify(msg));
    bot.sendMessage(id, `${msg.from.first_name}, досить катать в свою доту, краще розробляй мене`,openKeyboard);
    if(msg.text === 'Aut') {
        console.log('!!!!!!!!!!!!!')
    }
})