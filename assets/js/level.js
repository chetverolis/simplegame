// Генерируем уровень
function generateLvl() {
    for (let i = 0; i < (flasks.length - 2); i++) {
        for (let j = 0; j < 3; j++) {
            // Получаем случайное число от 0 до 8
            let rnd_num = Math.floor(Math.random() * 9);
            // Проверяем на кол-во существующих цветов
            if (colors_check[rnd_num] < 3) {
                // Создаём шар
                let ball = document.createElement('div');
                // Присваиваем id
                ball.setAttribute('id', `ball_${(i + 1)+'_'+(j + 1)}`);
                // Присваиваем class
                ball.setAttribute('class', 'ball');
                // Присваиваем цвет
                ball.setAttribute('b_color', `${rnd_num}`)
                ball.style.backgroundColor = `${colors[rnd_num]}`;
                // Втыкаем в колбу
                flasks[i].prepend(ball);
                // Крутим счётчик цвета, прибавляем 1
                colors_check[rnd_num] += 1;
            } else {
                // Если в рандоме такой цвет есть, то откатываемся во внутреннем цикле назад
                // console.log('fail');
                j -= 1;
            }
        }
    }
};

// Сохраняем сгенерируемый уровень
function saveLvl() {
    // Сохраняем уровень в массиве
    for (let i = 0; i < flasks.length; i++) {
        for (let j = 0; j < ball_max; j++) {
            if (flasks[i].children[j]) {
                level[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(level[i])
            } else {
                j += 1;
            }
        }
    }

    // Обрезаем строки в массиве
    for (let i = 0; i < level.length; i++) {
        level[i] = String(level[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
    }

    // Проверка
    console.log('Level:');
    console.log(level);
}

generateLvl();
saveLvl();

function restartLvl() {
    // Стираем уровень
    for (let i = 0; i < flasks.length; i++) {
        flasks[i].innerHTML = null;
    }

    // Возвращаем в исходное состояние
    for (let i = 0; i < (flasks.length - 2); i++) {
        for (let j = 0; j < ball_max; j++) {
            // Создаём шар
            let ball = document.createElement('div');
            // Присваиваем id
            ball.setAttribute('id', `ball_${(i + 1)+'_'+(j + 1)}`);
            // Присваиваем class
            ball.setAttribute('class', 'ball');
            // Присваиваем цвет
            let ball_color = level[i].split(',');
            ball.setAttribute('b_color', `${ball_color[j]}`)
            ball.style.backgroundColor = `${colors[ball_color[j]]}`;
            // Втыкаем в колбу
            flasks[i].prepend(ball);
        }
    }

    win();

    movement_layer_1 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
    movement_layer_2 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
    movement_layer_3 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
    movement_layer_4 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
    movement_layer_5 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
    movement_layer_6 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
    movement_layer_7 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
    movement_layer_8 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
    movement_layer_9 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
    movement_layer_10 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];

    movement_points = 0,
    movement_points_max = 10,
    current_move = 0,
    movement_check = 0,
    click_check = 0,
    firstBack_check = 0;

    document.querySelector('button#move_back').innerHTML = `Вернуться на ход назад (${current_move})`;
}