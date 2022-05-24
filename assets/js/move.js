// Ходы
function move() {
    // Смотрим за переключателем, дабы избежать двойного хода, т.к. при перемещении шара, приходится нажимать на колбу два раза
    if (movement_check == 0) {
        // В зависимости от хода (movement_points), а их может быть максимум 5, стираем определенные массивы
        if (movement_points == 0) {
            movement_layer_5 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 1) {
            movement_layer_6 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 2) {
            movement_layer_7 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 3) {
            movement_layer_8 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 4) {
            movement_layer_9 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 5) {
            movement_layer_10 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 6) {
            movement_layer_1 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 7) {
            movement_layer_2 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 8) {
            movement_layer_3 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points == 9) {
            movement_layer_4 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        }
        if (movement_points < movement_points_max) {
            /* Сохраняем ходы в массивах, конечно, это можно было бы сделать через цикл, чтобы избавиться от тонны текста
            но я не знал, как в цикле играться с названиями (вернее их номерами) movement_layer_1, возможно решу в будущих обновлениях
            эту проблему =) */ 
            if (movement_points == 0) {
                // Обнуляем слой movement_layer_1 перед его сохранением
                movement_layer_1 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                // Проходим по всему полю i колб, j шаров, чтобы сохранить их цвета
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        // Если flasks[i].children[j] существует, то сохраняем его цвет
                        if (flasks[i].children[j]) {
                            movement_layer_1[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_1[i])
                        } else {
                            // иначе пропуск шара
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_1.length; i++) {
                    movement_layer_1[i] = String(movement_layer_1[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 1) {
                movement_layer_2 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_2[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_2[i]);
                        } else {
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_2.length; i++) {
                    movement_layer_2[i] = String(movement_layer_2[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 2) {
                movement_layer_3 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_3[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_3[i]);
                        } else {
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_3.length; i++) {
                    movement_layer_3[i] = String(movement_layer_3[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 3) {
                movement_layer_4 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_4[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_4[i]);
                        } else {
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_4.length; i++) {
                    movement_layer_4[i] = String(movement_layer_4[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 4) {
                movement_layer_5 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_5[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_5[i]);
                        } else {
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_5.length; i++) {
                    movement_layer_5[i] = String(movement_layer_5[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 5) {
                movement_layer_6 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_6[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_6[i]);
                        } else {
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_6.length; i++) {
                    movement_layer_6[i] = String(movement_layer_6[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 6) {
                movement_layer_7 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_7[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_7[i]);
                        } else {
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_7.length; i++) {
                    movement_layer_7[i] = String(movement_layer_7[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 7) {
                movement_layer_8 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_8[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_8[i]);
                        } else {
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_8.length; i++) {
                    movement_layer_8[i] = String(movement_layer_8[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 8) {
                movement_layer_9 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_9[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_9[i]);
                        } else {
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_9.length; i++) {
                    movement_layer_9[i] = String(movement_layer_9[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            } else if (movement_points == 9) {
                movement_layer_10 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                for (let i = 0; i < flasks.length; i++) {
                    for (let j = 0; j < ball_max; j++) {
                        if (flasks[i].children[j]) {
                            movement_layer_10[i] = String(flasks[i].children[j].getAttribute('b_color')) + ',' + String(movement_layer_10[i]);
                        } else {
                            j += 1;
                        }
                    }
                }

                // Обрезаем строки в массиве
                for (let i = 0; i < movement_layer_10.length; i++) {
                    movement_layer_10[i] = String(movement_layer_10[i]).replace('undefined', '').replace('100', '').replace(/.$/, '').substring(0, 5);
                }
            }
            // Прибавляем ход
            movement_points += 1;
            // Проверка
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
        // Блокируем ход, чтобы избежать двойной прибавки
        movement_check = 1;
    }
}

// Ход назад
function move_back() {
    // Проверка на ходы, их не должно быть больше 5 и меньше 0
    if (current_move <= 5 && current_move > 0) {
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
                // В зависимости от текущего положения хода, выбираем цвета из предыдущего
                if (movement_points == 2) {
                    // ball_color - цвета всего стола на предыдущем ходу, после перехода, обнуляем текущий movement_layer_2
                    ball_color = movement_layer_1[i].split(',');
                    movement_layer_2 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                } else if (movement_points == 3) {
                    ball_color = movement_layer_2[i].split(',');
                    movement_layer_3 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                } else if (movement_points == 4) {
                    ball_color = movement_layer_3[i].split(',');
                    movement_layer_4 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                } else if (movement_points == 5) {
                    ball_color = movement_layer_4[i].split(',');
                    movement_layer_5 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                } else if (movement_points == 6) {
                    ball_color = movement_layer_5[i].split(',');
                    movement_layer_6 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                } else if (movement_points == 7) {
                    ball_color = movement_layer_6[i].split(',');
                    movement_layer_7 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                } else if (movement_points == 8) {
                    ball_color = movement_layer_7[i].split(',');
                    movement_layer_8 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                } else if (movement_points == 9) {
                    ball_color = movement_layer_8[i].split(',');
                    movement_layer_9 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                } else if (movement_points == 10) {
                    ball_color = movement_layer_9[i].split(',');
                    movement_layer_10 = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
                } else if (movement_points == 1) {
                    // Проверка на возврат к нулевому положению при условии, что мы ещё не достигли 10 хода
                    if (firstBack_check == 0) {
                        // Цвета берем из изначально сгенерируемых
                        ball_color = level[i].split(',');
                    } else {
                        // Цвета берем из предыдущего хода
                        ball_color = movement_layer_10[i].split(',');
                    }
                }
                // Цвет не может быть пустым и содержать значение: "100"
                if (ball_color != '' && ball_color != '100') {
                    // Если количество цветов (индексов) в массиве 1,2 и т.п., то берем только его(их) цвет, а дальше выходим из цикла через break
                    if (ball_color.length == 1) {
                        if (j == 1) {
                            break;
                        }
                        ball.setAttribute('b_color', `${ball_color[j]}`)
                        ball.style.backgroundColor = `${colors[ball_color[j]]}`;
                    } else if (ball_color.length == 2) {
                        if (j == 2) {
                            break;
                        }
                        ball.setAttribute('b_color', `${ball_color[j]}`)
                        ball.style.backgroundColor = `${colors[ball_color[j]]}`;
                    } else {
                        ball.setAttribute('b_color', `${ball_color[j]}`)
                        ball.style.backgroundColor = `${colors[ball_color[j]]}`;
                    }
                    // Втыкаем в колбу
                    flasks[i].prepend(ball);
                } else {
                    // Проверка
                }
            }
        }
        // Уменьшаем ход
        movement_points -= 1;
        if (firstBack_check == 1) {
            if (movement_points == 0) {
                movement_points = 10;
            }
        }
        // Обновляем кол-во доступных ходов на кнопке
        if (current_move >= 0) {
            current_move -= 1;
            console.log('current_move = '+current_move);
            document.querySelector('button#move_back').innerHTML = `Вернуться на ход назад (${current_move})`;
        }
        // Проверка
        console.log('movement_points = '+movement_points)
        // Прогоняем через функцию win(), чтобы сбросить определенные значения
        win();

        // console.log('Обратный ход: '+movement_points);
        // console.log (movement_layer_1);
        // console.log (movement_layer_2);
        // console.log (movement_layer_3);
        // console.log (movement_layer_4);
        // console.log (movement_layer_5);
        // console.log (movement_layer_6);
        // console.log (movement_layer_7);
        // console.log (movement_layer_8);
        // console.log (movement_layer_9);
        // console.log (movement_layer_10);
    }
}