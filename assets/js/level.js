// Генерируем уровень
function generateLvl() {
    skin_load();

    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Получаем новые значения
    g_num_balls_value = document.querySelector('input#g_num_balls').value;

    if (g_num_balls_value == '') {
        ball_max = randomNum(3, 5);
    }

    for (let i = 0; i < (flasks.length - 2); i++) {
        for (let j = 0; j < ball_max; j++) {
            // Получаем случайное число от 0 до 8
            let rnd_num = randomNum(0, 8);
            // Проверяем на кол-во существующих цветов
            if (colors_check[rnd_num] < ball_max) {
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

    flask_height_update();
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
        level[i] = String(level[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, (ball_max * 2));
    }

    // Проверка
    console.log('Level:');
    console.log(level);
}

generateLvl();
saveLvl();
scroll_switch();


function restartLvl() {
    // Сохраняем текущую высоту колбы и стираем уровень
    let flask_height = flasks[0].style.height;
    g_body_wrapper.innerHTML = null;
    
    for (let i = 0; i < 11; i++) {
        let flask = document.createElement('div');
        // Присваиваем class
        flask.setAttribute('class', 'flask');
        // Присваиваем высоту
        flask.style.height = `${flask_height}`;
        // Втыкаем в wrapper
        g_body_wrapper.append(flask);
    }

    // Обновляем кол-во колб
    flasks = document.querySelectorAll('div.flask');

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

    // Обнуляем все ходы, приводим их к дефолтному значению
    movement_layer_1 = Array(flasks.length).fill(100);
    movement_layer_2 = Array(flasks.length).fill(100);
    movement_layer_3 = Array(flasks.length).fill(100);
    movement_layer_4 = Array(flasks.length).fill(100);
    movement_layer_5 = Array(flasks.length).fill(100);
    movement_layer_6 = Array(flasks.length).fill(100);
    movement_layer_7 = Array(flasks.length).fill(100);
    movement_layer_8 = Array(flasks.length).fill(100);
    movement_layer_9 = Array(flasks.length).fill(100);
    movement_layer_10 = Array(flasks.length).fill(100);

    // Обнуляем все значения
    flask_add_num;
    movement_points = 0;
    movement_points_max = 10;
    current_move = 0;
    movement_check = 0;
    click_check = 0;
    firstBack_check = 0;

    // Обновляем число в кнопке
    document.querySelector('span#move_back').innerHTML = current_move;

    // Добавляем или убираем скролл
    let g_body_wrapper_h = g_body_wrapper.clientHeight,
    g_body_h = g_body.clientHeight;
    if (g_body_wrapper_h > g_body_h) {
        g_body.style.overflowY = 'scroll';
    } else {
        g_body.style.overflowY = 'hidden';
    }
}

// Изменение кол-ва шаров
change_num_balls.addEventListener('click', function() {
    // Получаем новые значения
    g_num_balls_value = document.querySelector('input#g_num_balls').value;
    if (g_num_balls_value != '' && isNaN(parseInt(g_num_balls_value)) == false) {
        // Сбрасываем текущий уровень
        restartLvl();

        // Стираем уровень
        for (let i = 0; i < flasks.length; i++) {
            flasks[i].innerHTML = null;
        }

        // Обнуляем чек цветов
        colors_check = [0, 0, 0, 0, 0, 0, 0, 0, 0]

        // Обновляем значения
        ball_max = g_num_balls_value;

        // Генерируем новый уровень с новым кол-вом шаров
        generateLvl();
        saveLvl();
        scroll_switch();
    }
})