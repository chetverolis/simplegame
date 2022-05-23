// Инициализация
const flasks = document.querySelectorAll('div.flask'),
    hidden_flasks = document.querySelectorAll('div.hidden_flask');

let ball = null,
    ball_max = 3,
    ball_numForWin = ball_max * (flasks.length - 2),
    movement_points = 0,
    movement_points_max = 10,
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
let colors_check = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
]

let level = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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
    for (let i = 0; i < (flasks.length - 2); i++) {
        for (let j = 0; j < ball_max; j++) {
            level[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(level[i])
        }
    }

    // Обрезаем строки в массиве
    for (let i = 0; i < level.length; i++) {
        level[i] = level[i].substring(0, 5);
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
}

function move() {
    if (movement_check == 0) {
        if (movement_points == 0) {
            movement_layer_6 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 1) {
            movement_layer_7 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 2) {
            movement_layer_8 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 3) {
            movement_layer_9 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 4) {
            movement_layer_10 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 5) {
            movement_layer_1 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 6) {
            movement_layer_2 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 7) {
            movement_layer_3 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 8) {
            movement_layer_4 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 9) {
            movement_layer_5 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points < movement_points_max) {
            // Сохраняем ходы в массивах
            if (movement_points == 0) {
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_1[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_1[i])
                        } else {
                            // console.log('Nope >:D'+i);
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_1.length; i++) {
                    movement_layer_1[i] = String(movement_layer_1[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 1) {
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_2[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_2[i]);
                        } else {
                            // console.log('Nope >:D'+i);
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_1.length; i++) {
                    movement_layer_2[i] = String(movement_layer_2[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 2) {
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_3[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_3[i]);
                        } else {
                            // console.log('Nope >:D'+i);
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_1.length; i++) {
                    movement_layer_3[i] = String(movement_layer_3[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 3) {
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_4[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_4[i]);
                        } else {
                            // console.log('Nope >:D'+i);
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_1.length; i++) {
                    movement_layer_4[i] = String(movement_layer_4[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 4) {
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_5[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_5[i]);
                        } else {
                            // console.log('Nope >:D'+i);
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_1.length; i++) {
                    movement_layer_5[i] = String(movement_layer_5[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 5) {
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_6[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_6[i]);
                        } else {
                            // console.log('Nope >:D'+i);
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_1.length; i++) {
                    movement_layer_6[i] = String(movement_layer_6[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 6) {
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_7[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_7[i]);
                        } else {
                            // console.log('Nope >:D'+i);
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_1.length; i++) {
                    movement_layer_7[i] = String(movement_layer_7[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 7) {
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_8[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_8[i]);
                        } else {
                            // console.log('Nope >:D'+i);
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_1.length; i++) {
                    movement_layer_8[i] = String(movement_layer_8[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 8) {
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_9[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_9[i]);
                        } else {
                            // console.log('Nope >:D'+i);
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_1.length; i++) {
                    movement_layer_9[i] = String(movement_layer_9[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 9) {
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_10[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_10[i]);
                        } else {
                            // console.log('Nope >:D'+i);
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_1.length; i++) {
                    movement_layer_10[i] = String(movement_layer_10[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            }
            movement_points += 1;
            console.log('Ход: '+movement_points);
            console.log (movement_layer_1);
            console.log (movement_layer_2);
            console.log (movement_layer_3);
            console.log (movement_layer_4);
            console.log (movement_layer_5);
            console.log (movement_layer_6);
            console.log (movement_layer_7);
            console.log (movement_layer_8);
            console.log (movement_layer_9);
            console.log (movement_layer_10);
        }
        movement_check = 1;
    }
}

function move_back() {
    // Стираем уровень
    for (let i = 0; i < flasks.length; i++) {
        flasks[i].innerHTML = null;
    }

    // Возвращаем в исходное состояние
    for (let i = 0; i < flasks.length; i++) {
        for (let j = 0; j < ball_max; j++) {
            // Создаём шар
            let ball = document.createElement('div');
            // Присваиваем id
            ball.setAttribute('id', `ball_${(i + 1)+'_'+(j + 1)}`);
            // Присваиваем class
            ball.setAttribute('class', 'ball');
            // Присваиваем цвет
            let ball_color;
            if (movement_points == 2) {
                ball_color = movement_layer_1[i].split(',');
            } else if (movement_points == 3) {
                ball_color = movement_layer_2[i].split(',');
            } else if (movement_points == 4) {
                ball_color = movement_layer_3[i].split(',');
            } else if (movement_points == 5) {
                ball_color = movement_layer_4[i].split(',');
            } else if (movement_points == 6) {
                ball_color = movement_layer_5[i].split(',');
            } else if (movement_points == 7) {
                ball_color = movement_layer_6[i].split(',');
            } else if (movement_points == 8) {
                ball_color = movement_layer_7[i].split(',');
            } else if (movement_points == 9) {
                ball_color = movement_layer_9[i].split(',');
            } else if (movement_points == 10) {
                ball_color = movement_layer_9[i].split(',');
            } else if (movement_points == 1) {
                if (firstBack_check == 0) {
                    ball_color = level[i].split(',');
                    if (movement_points == 10) {
                        firstBack_check = 1;
                    }
                } else {
                    ball_color = movement_layer_10[i].split(',');
                }
            }
            if (ball_color != '' && ball_color != '100') {
                if (ball_color.length == 1) {
                    ball.setAttribute('b_color', `${ball_color[j]}`)
                    ball.style.backgroundColor = `${colors[ball_color[j]]}`;
                    if (j == 1) {
                        break;
                    }
                } else if (ball_color.length == 2) {
                    ball.setAttribute('b_color', `${ball_color[j]}`)
                    ball.style.backgroundColor = `${colors[ball_color[j]]}`;
                    if (j == 2) {
                        break;
                    }
                } else {
                    ball.setAttribute('b_color', `${ball_color[j]}`)
                    ball.style.backgroundColor = `${colors[ball_color[j]]}`;
                }
                // Втыкаем в колбу
                flasks[i].prepend(ball);
            } else {
                console.log('ходы кончились');
            }
        }
    }

    movement_points -= 1;
    console.log('movement_points = '+movement_points)

    win();
}

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
        }, 1000)
    }
}

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
            if ((b_color_active == b_color && flask.children.length != 3) || flask.children.length == 0) {
                flask.prepend(ball);
                setTimeout(function() {
                    flask.children[0].style.bottom = `${(flask.children[0].clientHeight * (flask.children.length - 1)) + ((flask.children.length - 1) * 4)}px`;
                }, 300)
                setTimeout(function() {
                    flask.children[0].style.position = null;
                    flask.children[0].style.bottom = null;
                }, 600)
                ball.classList.remove('active_ball');
                ball = null,
                b_color = null,
                b_color_active = null;
                click_check = 0;
                move();
                if (movement_points == 10) {
                    movement_points = 0;
                }
                movement_check = 0;
            } else {
                // Иначе возвращаем обратно в его колбу
                ball = document.querySelector('div.active_ball');
                ball.style.position = 'absolute';
                ball.style.bottom = `${ball.clientHeight * (ball.parentNode.children.length - 1) + ((ball.parentNode.children.length - 1) * 4)}px`;
                setTimeout(function() {
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
        win();
    })
}