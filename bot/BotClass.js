const db = require('./../Mongo');

class BotHelper {

    checkButtonPressed(btn) {
        switch (btn) {
            case 'Давай':
                return new Promise((resolve, reject) => {
                    resolve([{text: 'Класно, вибирай'}, {
                        reply_markup: {
                            keyboard: [
                                ["Пиво", "Ель"],
                            ],
                            one_time_keyboard: true,
                            resize_keyboard: true
                        }
                    }]);
                });

            case 'Ні, давай без мене':
                return [{text: 'Прощай'}, {
                    reply_markup: {
                        keyboard: [
                            ["Прощай"],
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                }];

            case 'Пиво':
                return new Promise((resolve, reject) => {
                    resolve([{text: 'мммм, півоосік)) вибирай'},
                        {
                            reply_markup: {
                                keyboard: [
                                    ["Світле", "Темне"],
                                ],
                                one_time_keyboard: true,
                                resize_keyboard: true
                            }
                        }]);
                });

            case 'Ель':
                return new Promise((resolve, reject) => {
                    resolve([{text: 'Який смак?'}, {
                        reply_markup: {
                            keyboard: [
                                ["Медовий", "Хуйовий"],
                            ],
                            one_time_keyboard: true,
                            resize_keyboard: true
                        }
                    }])
                });
                break;

            case 'Світле':
                return new Promise((resolve, reject) => {
                    const condition = {isLight: true};
                    db.selectOne(condition)
                        .then(result => {
                            console.log([{text: `Спробуй ${result.name}`}]);
                            resolve ([{text: `Спробуй ${result}`}])
                        })
                        .catch(err => reject(err));
                });

            default:
                return new Promise((resolve, reject) => {
                    resolve([{text: 'оххх, давай почнемо з початку'}, {
                        reply_markup: {
                            keyboard: [
                                ["/start"],
                            ],
                            one_time_keyboard: true,
                            resize_keyboard: true
                        }
                    }])
                });
        }
    }
}

const
    botHelper = new BotHelper();
module.exports = botHelper;