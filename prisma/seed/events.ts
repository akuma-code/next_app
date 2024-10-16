
// export const eventsMap = db.events.map(event => ({ ...event, players: event.players.map(p => ({ name: p.name, id: p.id })) }))
type Reduced = {
    pairs: {
        id?: number;
        firstPlayerId: number;
        secondPlayerId: number;
    }[],
    players: {
        id: number;
        name: string;
    }[],
    event: {
        id: number;
        date_formated: string;
        title: string;
    }
}
export const events_last = [
    {
        "id": 80,
        "date_formated": "19_06_2024",
        "eventInfo": null,
        "pairs": [],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 6,
                "name": "Инна Гулина"
            },
            {
                "id": 14,
                "name": "Сергей Кучигин"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 44,
                "name": "Олег Мельников"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            }
        ]
    },
    {
        "id": 81,
        "date_formated": "21_06_2024",
        "eventInfo": null,
        "pairs": [],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 3,
                "name": "Володя Юдаев"
            },
            {
                "id": 4,
                "name": "Дмитий Чуприков"
            },
            {
                "id": 6,
                "name": "Инна Гулина"
            },
            {
                "id": 7,
                "name": "Лариса Басманова"
            },
            {
                "id": 10,
                "name": "Павел Кот"
            },
            {
                "id": 13,
                "name": "Рома Урусов"
            },
            {
                "id": 14,
                "name": "Сергей Кучигин"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 20,
                "name": "Надежда Отпетова"
            },
            {
                "id": 22,
                "name": "Антон Киселев"
            },
            {
                "id": 44,
                "name": "Олег Мельников"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            }
        ]
    },
    {
        "id": 82,
        "date_formated": "26_06_2024",
        "eventInfo": null,
        "pairs": [],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 1,
                "name": "Борис Палевич"
            },
            {
                "id": 3,
                "name": "Володя Юдаев"
            },
            {
                "id": 6,
                "name": "Инна Гулина"
            },
            {
                "id": 7,
                "name": "Лариса Басманова"
            },
            {
                "id": 10,
                "name": "Павел Кот"
            },
            {
                "id": 12,
                "name": "Рома Русаков"
            },
            {
                "id": 13,
                "name": "Рома Урусов"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 16,
                "name": "Юра Малин"
            },
            {
                "id": 20,
                "name": "Надежда Отпетова"
            },
            {
                "id": 28,
                "name": "Володя Иванов"
            },
            {
                "id": 30,
                "name": "Максим Ушкарев"
            },
            {
                "id": 41,
                "name": "Жижирий Сергей"
            },
            {
                "id": 44,
                "name": "Олег Мельников"
            },
            {
                "id": 45,
                "name": "Сергей Попов"
            },
            {
                "id": 50,
                "name": "Сергей Казарян"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            },
            {
                "id": 26,
                "name": "Дима Селезнев"
            }
        ]
    },
    {
        "id": 83,
        "date_formated": "28_06_2024",
        "eventInfo": null,
        "pairs": [],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 1,
                "name": "Борис Палевич"
            },
            {
                "id": 8,
                "name": "Олег Котляров"
            },
            {
                "id": 12,
                "name": "Рома Русаков"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 19,
                "name": "Саша Федоренко"
            },
            {
                "id": 20,
                "name": "Надежда Отпетова"
            },
            {
                "id": 22,
                "name": "Антон Киселев"
            },
            {
                "id": 44,
                "name": "Олег Мельников"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            }
        ]
    },
    {
        "id": 84,
        "date_formated": "03_07_2024",
        "eventInfo": null,
        "pairs": [],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 7,
                "name": "Лариса Басманова"
            },
            {
                "id": 12,
                "name": "Рома Русаков"
            },
            {
                "id": 44,
                "name": "Олег Мельников"
            },
            {
                "id": 45,
                "name": "Сергей Попов"
            },
            {
                "id": 55,
                "name": "Роман Алиев"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            }
        ]
    },
    {
        "id": 85,
        "date_formated": "05_07_2024",
        "eventInfo": null,
        "pairs": [
            {
                "id": 49,
                "firstPlayerId": 1,
                "secondPlayerId": 7,
                // "eventId": 85
            },
            {
                "id": 50,
                "firstPlayerId": 1,
                "secondPlayerId": 35,
                // "eventId": 85
            }
        ],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 3,
                "name": "Володя Юдаев"
            },
            {
                "id": 7,
                "name": "Лариса Басманова"
            },
            {
                "id": 8,
                "name": "Олег Котляров"
            },
            {
                "id": 12,
                "name": "Рома Русаков"
            },
            {
                "id": 13,
                "name": "Рома Урусов"
            },
            {
                "id": 14,
                "name": "Сергей Кучигин"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 35,
                "name": "Сергей Олейников"
            },
            {
                "id": 43,
                "name": "Андрей Руденко"
            },
            {
                "id": 44,
                "name": "Олег Мельников"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            },
            {
                "id": 201,
                "name": "Максим Грибков"
            }
        ]
    },
    {
        "id": 86,
        "date_formated": "10_07_2024",
        "eventInfo": null,
        "pairs": [
            {
                "id": 51,
                "firstPlayerId": 1,
                "secondPlayerId": 35,
                // "eventId": 86
            },
            {
                "id": 52,
                "firstPlayerId": 2,
                "secondPlayerId": 12,
                // "eventId": 86
            },
            {
                "id": 53,
                "firstPlayerId": 2,
                "secondPlayerId": 46,
                // "eventId": 86
            }
        ],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 3,
                "name": "Володя Юдаев"
            },
            {
                "id": 6,
                "name": "Инна Гулина"
            },
            {
                "id": 7,
                "name": "Лариса Басманова"
            },
            {
                "id": 12,
                "name": "Рома Русаков"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 20,
                "name": "Надежда Отпетова"
            },
            {
                "id": 28,
                "name": "Володя Иванов"
            },
            {
                "id": 35,
                "name": "Сергей Олейников"
            },
            {
                "id": 41,
                "name": "Жижирий Сергей"
            },
            {
                "id": 43,
                "name": "Андрей Руденко"
            },
            {
                "id": 46,
                "name": "Надя"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            },
            {
                "id": 202,
                "name": "Эдуард Емельянов"
            }
        ]
    },
    {
        "id": 87,
        "date_formated": "12_07_2024",
        "eventInfo": null,
        "pairs": [
            {
                "id": 54,
                "firstPlayerId": 2,
                "secondPlayerId": 11,
                // "eventId": 87
            },
            {
                "id": 55,
                "firstPlayerId": 1,
                "secondPlayerId": 19,
                // "eventId": 87
            },
            {
                "id": 56,
                "firstPlayerId": 2,
                "secondPlayerId": 22,
                // "eventId": 87
            }
        ],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 3,
                "name": "Володя Юдаев"
            },
            {
                "id": 8,
                "name": "Олег Котляров"
            },
            {
                "id": 14,
                "name": "Сергей Кучигин"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 19,
                "name": "Саша Федоренко"
            },
            {
                "id": 20,
                "name": "Надежда Отпетова"
            },
            {
                "id": 22,
                "name": "Антон Киселев"
            },
            {
                "id": 55,
                "name": "Роман Алиев"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            }
        ]
    },
    {
        "id": 72,
        "date_formated": "24_05_2024",
        "eventInfo": null,
        "pairs": [],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 1,
                "name": "Борис Палевич"
            },
            {
                "id": 3,
                "name": "Володя Юдаев"
            },
            {
                "id": 4,
                "name": "Дмитий Чуприков"
            },
            {
                "id": 7,
                "name": "Лариса Басманова"
            },
            {
                "id": 8,
                "name": "Олег Котляров"
            },
            {
                "id": 12,
                "name": "Рома Русаков"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 16,
                "name": "Юра Малин"
            },
            {
                "id": 19,
                "name": "Саша Федоренко"
            },
            {
                "id": 20,
                "name": "Надежда Отпетова"
            },
            {
                "id": 37,
                "name": "Костя Лабутин"
            },
            {
                "id": 44,
                "name": "Олег Мельников"
            },
            {
                "id": 46,
                "name": "Надя"
            },
            {
                "id": 50,
                "name": "Сергей Казарян"
            },
            {
                "id": 55,
                "name": "Роман Алиев"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            }
        ]
    },
    {
        "id": 73,
        "date_formated": "22_05_2024",
        "eventInfo": null,
        "pairs": [],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 1,
                "name": "Борис Палевич"
            },
            {
                "id": 3,
                "name": "Володя Юдаев"
            },
            {
                "id": 4,
                "name": "Дмитий Чуприков"
            },
            {
                "id": 7,
                "name": "Лариса Басманова"
            },
            {
                "id": 12,
                "name": "Рома Русаков"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 19,
                "name": "Саша Федоренко"
            },
            {
                "id": 20,
                "name": "Надежда Отпетова"
            },
            {
                "id": 22,
                "name": "Антон Киселев"
            },
            {
                "id": 44,
                "name": "Олег Мельников"
            },
            {
                "id": 45,
                "name": "Сергей Попов"
            },
            {
                "id": 55,
                "name": "Роман Алиев"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            }
        ]
    },
    {
        "id": 74,
        "date_formated": "29_05_2024",
        "eventInfo": null,
        "pairs": [],
        "title": "Треня",
        "isDraft": false,
        "players": [
            {
                "id": 1,
                "name": "Борис Палевич"
            },
            {
                "id": 3,
                "name": "Володя Юдаев"
            },
            {
                "id": 5,
                "name": "Женя Мураткалиев"
            },
            {
                "id": 7,
                "name": "Лариса Басманова"
            },
            {
                "id": 8,
                "name": "Олег Котляров"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 16,
                "name": "Юра Малин"
            },
            {
                "id": 19,
                "name": "Саша Федоренко"
            },
            {
                "id": 20,
                "name": "Надежда Отпетова"
            },
            {
                "id": 35,
                "name": "Сергей Олейников"
            },
            {
                "id": 37,
                "name": "Костя Лабутин"
            },
            {
                "id": 42,
                "name": "Денис Попов"
            },
            {
                "id": 45,
                "name": "Сергей Попов"
            },
            {
                "id": 50,
                "name": "Сергей Казарян"
            },
            {
                "id": 55,
                "name": "Роман Алиев"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            }
        ]
    },
    {
        "id": 75,
        "date_formated": "31_05_2024",
        "eventInfo": null,
        "pairs": [],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 3,
                "name": "Володя Юдаев"
            },
            {
                "id": 6,
                "name": "Инна Гулина"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 19,
                "name": "Саша Федоренко"
            },
            {
                "id": 20,
                "name": "Надежда Отпетова"
            },
            {
                "id": 22,
                "name": "Антон Киселев"
            },
            {
                "id": 37,
                "name": "Костя Лабутин"
            },
            {
                "id": 48,
                "name": "Дима Кирсанов"
            },
            {
                "id": 55,
                "name": "Роман Алиев"
            },
            {
                "id": 56,
                "name": "Артём Белишев"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            }
        ]
    },
    {
        "id": 76,
        "date_formated": "05_06_2024",
        "eventInfo": null,
        "pairs": [],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 1,
                "name": "Борис Палевич"
            },
            {
                "id": 3,
                "name": "Володя Юдаев"
            },
            {
                "id": 5,
                "name": "Женя Мураткалиев"
            },
            {
                "id": 6,
                "name": "Инна Гулина"
            },
            {
                "id": 7,
                "name": "Лариса Басманова"
            },
            {
                "id": 14,
                "name": "Сергей Кучигин"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 20,
                "name": "Надежда Отпетова"
            },
            {
                "id": 44,
                "name": "Олег Мельников"
            },
            {
                "id": 45,
                "name": "Сергей Попов"
            },
            {
                "id": 46,
                "name": "Надя"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            },
            {
                "id": 58,
                "name": "Женя Понуровский"
            },
            {
                "id": 59,
                "name": "Егор Лысенко"
            }
        ]
    },
    {
        "id": 77,
        "date_formated": "07_06_2024",
        "eventInfo": null,
        "pairs": [],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 1,
                "name": "Борис Палевич"
            },
            {
                "id": 3,
                "name": "Володя Юдаев"
            },
            {
                "id": 4,
                "name": "Дмитий Чуприков"
            },
            {
                "id": 6,
                "name": "Инна Гулина"
            },
            {
                "id": 12,
                "name": "Рома Русаков"
            },
            {
                "id": 14,
                "name": "Сергей Кучигин"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 19,
                "name": "Саша Федоренко"
            },
            {
                "id": 22,
                "name": "Антон Киселев"
            },
            {
                "id": 44,
                "name": "Олег Мельников"
            },
            {
                "id": 45,
                "name": "Сергей Попов"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            },
            {
                "id": 60,
                "name": "Егор Артемьев"
            }
        ]
    },
    {
        "id": 78,
        "date_formated": "12_06_2024",
        "eventInfo": null,
        "pairs": [],
        "title": "Начало 19-40",
        "isDraft": false,
        "players": [
            {
                "id": 1,
                "name": "Борис Палевич"
            },
            {
                "id": 6,
                "name": "Инна Гулина"
            },
            {
                "id": 7,
                "name": "Лариса Басманова"
            },
            {
                "id": 13,
                "name": "Рома Урусов"
            },
            {
                "id": 14,
                "name": "Сергей Кучигин"
            },
            {
                "id": 30,
                "name": "Максим Ушкарев"
            },
            {
                "id": 32,
                "name": "Лена Сластная"
            },
            {
                "id": 41,
                "name": "Жижирий Сергей"
            },
            {
                "id": 45,
                "name": "Сергей Попов"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            },
            {
                "id": 26,
                "name": "Дима Селезнев"
            },
            {
                "id": 61,
                "name": "Роман Переведенцев"
            }
        ]
    },
    {
        "id": 79,
        "date_formated": "14_06_2024",
        "eventInfo": null,
        "pairs": [],
        "title": "Тренировка",
        "isDraft": false,
        "players": [
            {
                "id": 3,
                "name": "Володя Юдаев"
            },
            {
                "id": 4,
                "name": "Дмитий Чуприков"
            },
            {
                "id": 6,
                "name": "Инна Гулина"
            },
            {
                "id": 14,
                "name": "Сергей Кучигин"
            },
            {
                "id": 15,
                "name": "Сергей Коробов"
            },
            {
                "id": 17,
                "name": "Ольга Сипина"
            },
            {
                "id": 19,
                "name": "Саша Федоренко"
            },
            {
                "id": 22,
                "name": "Антон Киселев"
            },
            {
                "id": 30,
                "name": "Максим Ушкарев"
            },
            {
                "id": 41,
                "name": "Жижирий Сергей"
            },
            {
                "id": 45,
                "name": "Сергей Попов"
            },
            {
                "id": 11,
                "name": "Павел Роднянский"
            },
            {
                "id": 58,
                "name": "Женя Понуровский"
            }
        ]
    }
]

export const events_grouped = events_last.reduce((acc, curr) => {
    const { pairs, players, id, date_formated, title } = curr
    const event = { id, date_formated, title }
    acc.push({ pairs, players, event })
    return acc

}, [] as Reduced[])