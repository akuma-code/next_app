const players_mock = [
    'Борис Палевич',
    'Валера Русинович',
    'Володя Юдаев',
    'Дмитий Чуприков',
    'Женя Мураткалиев',
    'Инна Гулина',
    'Лариса Басманова',
    'Олег Котляров',
    'Павел Аниловский',
    'Павел Кот',
    'Павел Роднянский',
    'Рома Русаков',
    'Рома Урусов',
    'Сергей Кучигин',
].map((name,idx)=>({id:idx+1, name, events:[]}))