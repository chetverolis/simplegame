"use strict";   
// Инициализация
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

let g_body = document.querySelector('div#g_body'),
    g_body_wrapper = g_body.children[1],
    g_body_header = g_body.children[0],
    flasks = document.querySelectorAll('div.flask');

let change_num_balls = document.querySelector('button#change_num_balls'),
    g_num_balls = document.querySelector('input#g_num_balls'),
    g_num_balls_value = document.querySelector('input#g_num_balls').value,
    ball = null,
    ball_max = g_num_balls_value,
    ball_numForWin = ball_max * (flasks.length - 2),
    flask_add_num = 0,
    flask_add_max = 1,
    flask_add_confirm = 0,
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
let movement_layer_1 = Array(flasks.length).fill(100),
    movement_layer_2 = Array(flasks.length).fill(100),
    movement_layer_3 = Array(flasks.length).fill(100),
    movement_layer_4 = Array(flasks.length).fill(100),
    movement_layer_5 = Array(flasks.length).fill(100),
    movement_layer_6 = Array(flasks.length).fill(100),
    movement_layer_7 = Array(flasks.length).fill(100),
    movement_layer_8 = Array(flasks.length).fill(100),
    movement_layer_9 = Array(flasks.length).fill(100),
    movement_layer_10 = Array(flasks.length).fill(100);

// Переключение скролла
function scroll_switch() {
    setTimeout(function() {
        // Добавляем или убираем скролл
        let g_body_wrapper_h = g_body_wrapper.clientHeight,
            g_body_header_h = g_body_header.clientHeight,
            g_body_h = g_body.clientHeight;
        if (g_body_wrapper_h + g_body_header_h > g_body_h) {
            g_body.style.overflowY = 'scroll';
            // Проверка
            console.log('scroll on');
            console.log('g_body_wrapper_h = '+g_body_wrapper_h);
            console.log('g_body_h = '+g_body_h);     
        } else {
            g_body.style.overflowY = 'hidden';
            // Проверка
            console.log('scroll off');
            console.log('g_body_wrapper_h = '+g_body_wrapper_h);
            console.log('g_body_h = '+g_body_h);
        }
    }, 400)
}

// Победа
function win() {
    flasks = document.querySelectorAll('div.flask');

    // Инициализация победных чеков (перемычек), где 0 будет общим значением, а 1 и 2 означать false
    let win_check_1 = 1,
        win_check_2 = 2,
        one_ball_mode = 0;

    // Обнуляем массив с результатами проверок
    collected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Делаем проверку на режим с одним шаром в колбе
    if (flasks[0].children.length == 1 && flasks[1].children.length == 1 && flasks[2].children.length == 1 && flasks[3].children.length == 1 && flasks[4].children.length == 1 && flasks[5].children.length == 1 && flasks[6].children.length == 1 && flasks[7].children.length == 1) {
        collected = Array(flasks.length).fill(1);
        one_ball_mode = 1;
    }

    if (one_ball_mode == 0) {
        // Проверяем колбы на соответствие цветов, если цвета совпали, то заносим в массив 1
        for (let i = 0; i < flasks.length; i++) {
            for (let j = 0; j < ball_max; j++) {
                // Делаем первую проверку, проверяем на наличие следующего шара
                if (flasks[i].children[j + 1]) {
                    // Если он есть, сравниваем его и предыдущего шара
                    if (flasks[i].children[j + 1].getAttribute('b_color') == flasks[i].children[j].getAttribute('b_color')) {
                        win_check_1 = 0;
                    } else {
                        win_check_1 = 1;
                    }
                }
                // Делаем вторую проверку, проверяем на соответствие первого и последнего шара
                if (flasks[i].children.length == ball_max) {
                    if (flasks[i].firstChild.getAttribute('b_color') == flasks[i].lastChild.getAttribute('b_color') && win_check_1 == 0) {
                        win_check_2 = 0;
                    } else {
                        win_check_2 = 2;
                    }
                } else {
                    // Если кол-во шаров не соответствует ball_max, то отключаем перемычку
                    win_check_2 = 2;
                }
            }
            // Проверка чеков
            console.log(i+1+' колба win_check_1 = '+win_check_1);
            console.log(i+1+' колба win_check_2 = '+win_check_2);

            // Сравниваем две проверки и в случае соответствия, заносим в массив 1
            if (win_check_1 == win_check_2) {
                collected[i] = 1;
            }
        }
    }

    // Обнуляем проверку соответствия цветов
    let collected_check = 0

    // Проверяем после каждого хода, сколько колб заполнено верно
    for (let i = 0; i < collected.length; i++) {
        collected_check += collected[i]
    }

    // Проверка массива с результатами проверок
    console.log(collected);

    // Если игрок собрал все 9, то он победил
    if (collected_check >= 9) {
        setTimeout(function() {
            alert('You Win!');
            document.location.reload();
        }, 1000)
    }
}

// Нажатие на обычную колбу
document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('flask')) {
        flask_click(e.target);
        // console.log(e.target);
    }
    if (e.target.parentNode.classList.contains('flask')) {
        flask_click(e.target.parentNode);
        // console.log(e.target.parentNode);
    }
})

// Нажатие
function flask_click(e) {
    let win_animate_check_1 = 1,
        win_animate_check_2 = 2;
    if (click_check == 0) {
        // Доставание шарика из колбы
        let active_ball = document.querySelector('div.active_ball'),
            ball_check = typeof(active_ball) != "undefined" && active_ball !== null;

        if (ball_check != true) {
            ball = e.children[0];
            if (ball) {
                b_color_active = ball.getAttribute('b_color');
                e.children[0].classList.add('active_ball');
                e.children[0].style.position = 'absolute';
                e.children[0].style.bottom = `${e.children[0].clientHeight * ball_max + (ball_max * 4) + 20}px`;
                click_check = 1;
            }
        }
    } else {
        // Добавление шарика в колбу
        if (e.children.length >= 1) {
            b_color = e.children[0].getAttribute('b_color');
        }
        // Если шарик проходит проверку, то мы перекидываем его
        if ((b_color_active == b_color && e.children.length != ball_max) || e.children.length == 0) {
            e.prepend(ball);
            setTimeout(function() {
                e.children[0].style.bottom = `${(e.children[0].clientHeight * (e.children.length - 1)) + ((e.children.length - 1) * 4)}px`;
            }, 300)
            setTimeout(function() {
                e.children[0].style.position = null;
                e.children[0].style.bottom = null;
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
                document.querySelector('span#move_back').innerHTML = current_move;
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
            setTimeout(function() {
                e.style.animation = 'shake .2s ease-in-out';
            }, 400)
            setTimeout(function() {
                e.style.animation = null;
            }, 800)

            // Проверяем после каждого хода, сколько колб заполнено верно
            for (let i = 0; i < e.children.length; i++) {
                if (e.children[i + 1]) {
                    if (e.children[i].getAttribute('b_color') == e.children[i + 1].getAttribute('b_color')) {
                        win_animate_check_1 = 0;
                    } else {
                        win_animate_check_1 = 1;
                    }
                }
                if (e.children.length == ball_max) {
                    if (e.firstChild.getAttribute('b_color') == e.lastChild.getAttribute('b_color') && win_animate_check_1 == 0) {
                        win_animate_check_2 = 0
                    } else {
                        win_animate_check_2 = 2;
                    }
                }
            }

            // Проверка
            // console.log(i+1+' колба win_animate_check_1 = '+win_animate_check_1);
            // console.log(i+1+' колба win_animate_check_2 = '+win_animate_check_2);

            // Сравниваем две проверки и в случае соответствия, производим анимацию
            if (win_animate_check_1 == win_animate_check_2) {
                confetti_create(e);
            }
        } else {
            // Иначе возвращаем обратно в его колбу
            ball = document.querySelector('div.active_ball');
            ball.style.position = 'absolute';
            ball.style.bottom = `${ball.clientHeight * (ball.parentNode.children.length - 1) + ((ball.parentNode.children.length - 1) * 4)}px`;
            setTimeout(function() {
                // Обнуляем все значения и очищаем активный класс
                if (ball.classList.contains('active_ball')) {
                    ball.style.position = null;
                    ball.style.bottom = null;
                    ball.classList.remove('active_ball');
                }
                ball = null,
                b_color = null,
                b_color_active = null;
                click_check = 0;
            }, 300)
        }
    }

    // Делаем проверку на победу
    win();
}

// Добавление колбы
function flask_add() {
    // Проверка игрока
    if (flask_add_num < flask_add_max) {
        flask_add_num += 1;
    } else {
        flask_add_confirm = confirm(`По правилам игры, Вы можете добавить только ${flask_add_max} колбу, любите играть по правилам?`);
    }
    if (flask_add_confirm != true) {
        let flask = document.createElement('div');
        // Присваиваем class
        flask.setAttribute('class', 'flask');
        // Присваиваем высоту
        flask.style.height = `${flasks[0].style.height}`;
        // Втыкаем в wrapper
        g_body_wrapper.append(flask);
        // Обновляем кол-во колб
        flasks = document.querySelectorAll('div.flask');

        // Обновляем массивы с сохр. ходами, добавляем пустой слот
        level[flasks.length - 1] = '';
        movement_layer_1[flasks.length - 1] = 100;
        movement_layer_2[flasks.length - 1] = 100;
        movement_layer_3[flasks.length - 1] = 100;
        movement_layer_4[flasks.length - 1] = 100;
        movement_layer_5[flasks.length - 1] = 100;
        movement_layer_6[flasks.length - 1] = 100;
        movement_layer_7[flasks.length - 1] = 100;
        movement_layer_8[flasks.length - 1] = 100;
        movement_layer_9[flasks.length - 1] = 100;
        movement_layer_10[flasks.length - 1] = 100;

        // Добавляем или убираем скролл
        scroll_switch();
    }
}

function flask_height_update() {
    for (let i = 0; i < flasks.length; i++) {
        flasks[i].style.height = `${flasks[0].children[0].clientHeight * ball_max + (ball_max * 4)}px`
    }
}

// Меню
function menu_toggle() {
    let menu = document.querySelector('div#menu');

    // Открываем или закрываем меню
    if (menu.classList.contains('open')) {
        g_body.style.overflowY = '';
        scroll_switch();
    } else {
        g_body.style.overflowY = 'hidden';
    }
    menu.classList.toggle('open');
}

// Обновление Vh
function vh_refresh () {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

vh_refresh();

window.addEventListener('resize', function() {
    vh_refresh();
    scroll_switch();
    flask_height_update();
})

window.addEventListener('scroll', function() {
    vh_refresh();
})