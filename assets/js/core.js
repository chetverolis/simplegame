// Инициализация
const flasks = document.querySelectorAll('div.flask'),
    hidden_flasks = document.querySelectorAll('div.hidden_flask');

let change_num_balls = document.querySelector('button#change_num_balls'),
    g_num_balls = document.querySelector('input#g_num_balls'),
    g_num_balls_value = document.querySelector('input#g_num_balls').value,
    ball = null,
    ball_max = g_num_balls_value,
    ball_numForWin = ball_max * (flasks.length - 2),
    movement_points = 0,
    movement_points_max = 10,
    current_move = 0,
    movement_check = 0,
    b_color = null,
    b_color_active = null,
    click_check = 0,
    firstBack_check = 0;

let collected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Цвета
const colors = [
    '#c52b23', // 0 RED
    '#3b2ec4', // 1 BLUE
    '#789610', // 2 GREEN
    '#ea8c44', // 3 ORANGE
    '#732a93', // 4 PURPLE
    '#55a3e5', // 5 LIGHT_BLUE
    '#ea5e7b', // 6 PINK
    '#61d67d', // 7 LIGHT_GREEN
    '#636466' // 8 GRAY
]

// Для проверки цвета
let colors_check = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// Инициализация уровня
let level = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];

// Инициализация ходов
let movement_layer_1 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    movement_layer_2 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    movement_layer_3 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    movement_layer_4 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    movement_layer_5 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    movement_layer_6 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
    movement_layer_7 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
    movement_layer_8 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
    movement_layer_9 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
    movement_layer_10 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];

// Победа
function win() {
    // Проверяем колбы на соответствие цветов, если цвета совпали, то заносим в массив 1
    // Колбы
    for (let i = 0; i < flasks.length; i++) {
        // Шары
        for (let j = 0; j < flasks[i].children.length; j++) {
            // Проверяем на наличие шаров и их кол-ва
            if (flasks[i].children[j] && flasks[i].children.length == 3) {
                // Если первый шар равен второму и первый равен третьему, то заносим 1
                if (flasks[i].children[0].getAttribute('b_color') == flasks[i].children[1].getAttribute('b_color') && flasks[i].children[0].getAttribute('b_color') == flasks[i].children[2].getAttribute('b_color')) {
                    collected[i] = 1;
                }
            }
        }
    }

    // Обнуляем проверку соответствия цветов
    let collected_check = 0

    // Проверяем после каждого хода, сколько колб заполнено верно
    for (let i = 0; i < collected.length; i++) {
        collected_check += collected[i]
    }

    // Если игрок собрал все 9, то он победил
    if (collected_check == 9) {
        setTimeout(function() {
            alert('You Win!');
            document.location.reload();
        }, 1000)
    }
}

// Нажатие на колбу
for (let flask of flasks) {
    flask.addEventListener('click', function() {
        if (click_check == 0) {
            // Доставание шарика из колбы
            let active_ball = document.querySelector('div.active_ball'),
                ball_check = typeof(active_ball) != "undefined" && active_ball !== null;
            if (ball_check != true) {
                ball = flask.children[0];
                if (ball) {
                    b_color_active = ball.getAttribute('b_color');
                    flask.children[0].classList.add('active_ball');
                    flask.children[0].style.position = 'absolute';
                    flask.children[0].style.bottom = `${flask.children[0].clientHeight * ball_max + (ball_max * 4)}px`;
                    click_check = 1;
                }
            }
        } else {
            // Добавление шарика в колбу
            if (flask.children.length >= 1) {
                b_color = flask.children[0].getAttribute('b_color');
            }
            // Если шарик проходит проверку, то мы перекидываем его
            if ((b_color_active == b_color && flask.children.length != ball_max) || flask.children.length == 0) {
                flask.prepend(ball);
                setTimeout(function() {
                    flask.children[0].style.bottom = `${(flask.children[0].clientHeight * (flask.children.length - 1)) + ((flask.children.length - 1) * 4)}px`;
                }, 300)
                setTimeout(function() {
                    flask.children[0].style.position = null;
                    flask.children[0].style.bottom = null;
                }, 600)
                // Обнуляем все значения и очищаем активный класс
                ball.classList.remove('active_ball');
                ball = null,
                b_color = null,
                b_color_active = null;
                click_check = 0;
                // Обновляем кол-во доступных ходов на кнопке
                if (current_move < 5) {
                    current_move += 1;
                    console.log('current_move = '+current_move);
                    document.querySelector('button#move_back').innerHTML = `Вернуться на ход назад (${current_move})`;
                }
                // Сбрасываем кол-во ходов до 0, чтобы перейти с 10 хода на 0, если дошли до 10 и ходим дальше
                if (firstBack_check == 1 && movement_points == 10) {
                    movement_points = 0
                }
                // Сохраняем ход
                move();
                // Если дошли до 10, активируем перемычку, чтобы на 0 худе при возврате хода, вернуться к 10
                if (movement_points == 10) {
                    firstBack_check = 1;
                    // Проверка
                    console.log('firstBack_check = '+firstBack_check);
                }
                // Обнуляем проверку хода (выключаем перемычку), чтобы избавиться от двойного действия
                movement_check = 0;
            } else {
                // Иначе возвращаем обратно в его колбу
                ball = document.querySelector('div.active_ball');
                ball.style.position = 'absolute';
                ball.style.bottom = `${ball.clientHeight * (ball.parentNode.children.length - 1) + ((ball.parentNode.children.length - 1) * 4)}px`;
                setTimeout(function() {
                    // Обнуляем все значения и очищаем активный класс
                    ball.style.position = null;
                    ball.style.bottom = null;
                    ball.classList.remove('active_ball');
                    ball = null,
                    b_color = null,
                    b_color_active = null;
                    click_check = 0;
                }, 300)
            }
        }
        // Делаем проверку на победу
        win();
    })
}