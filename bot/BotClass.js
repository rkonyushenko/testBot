const db = require('./../Mongo');

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
                return [{text: 'мммм, півоосік)) вибирай'},
                    {
                        reply_markup: {
                            keyboard: [
                                ["Світле", "Темне"],
                            ],
                            one_time_keyboard: true,
                            resize_keyboard: true
                        }
                    }];

            case 'Ель':
                return [{text: 'Який смак?'}, {
                    reply_markup: {
                        keyboard: [
                            ["Медовий", "Хуйовий"],
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }];

            case 'Світле':
                return new Promise((resolve, reject) => {
                    db.selectOne()
                        .then(data => {
                            console.log('before return');
                            console.log(JSON.stringify(data));
                            resolve ([{text: JSON.stringify(data)}])
                        })
                        .catch(error => reject(error));
                });

            default:
                return [{text: 'оххх, давай почнемо з початку'}, {
                    reply_markup: {
                        keyboard: [
                            ["/start"],
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }];
        }
    }
}

const
    botHelper = new BotHelper();
module.exports = botHelper;