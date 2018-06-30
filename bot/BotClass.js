class BotHelper {

    checkButtonPressed(btn) {
        switch (btn) {
            case 'Давай':
                return [{text: 'Класно, вибирай'}, {
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

            case 'Пиво':
                return [{
                    reply_markup: {
                        keyboard: [
                            ["Світле", "Темне"],
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }];

            case 'Ель':
                return [{
                    reply_markup: {
                        keyboard: [
                            ["Медовий", "Хуйовий"],
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }];

            default:
                return [{text: 'Еййй, клікай на кнопочку'}];
        }
    }
}

const
    botHelper = new BotHelper();
module.exports = botHelper;