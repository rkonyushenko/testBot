
class BotHelper {

    checkButtonPressed(btn){
        switch (btn) {
            case 'Давай':
                return [{text: 'Класно, вибирай'},{
                    reply_markup: {
                        keyboard: [
                            ["Пиво", "Ель"],
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }];
            case 'Ні, давай без мене':
                return [{text: 'Прощай'}];

            default:
                return [{text: 'Еййй, клікай на кнопочку'}];
        }
    }
}

const botHelper = new BotHelper();
module.exports = botHelper;