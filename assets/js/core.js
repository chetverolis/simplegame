// Инициализация
const flasks = document.querySelectorAll('div.flask'),
    hidden_flasks = document.querySelectorAll('div.hidden_flask');

let ball = null,
    b_color = null,
    b_color_active = null,
    click_check = 0;

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

generateLvl();

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
                b_color_active = ball.getAttribute('b_color');
                flask.children[0].classList.add('active_ball');
                flask.children[0].style.position = 'absolute';
                flask.children[0].style.bottom = `${flask.children[0].clientHeight * 3 + 12}px`;
                click_check = 1;
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
                ball.classList.remove('active_ball');
                ball = null,
                b_color = null,
                b_color_active = null;
                click_check = 0;
            } else {
                // Иначе возвращаем обратно в его колбу
                ball = document.querySelector('div.active_ball');
                ball.classList.remove('active_ball');
                ball.style.position = null;
                ball.style.bottom = null;
                ball = null,
                b_color = null,
                b_color_active = null;
                click_check = 0;
            }
        }
        win();
    })
}