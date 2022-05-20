// Инициализация
const flasks = document.querySelectorAll('div.flask'),
    hidden_flasks = document.querySelectorAll('div.hidden_flask');

// console.log(flasks);
// console.log(hidden_flasks);

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
        // console.log(colors_check);
    }
};

generateLvl();

for (let flask of flasks) {
    flask.addEventListener('click', function() {
        flask.children[0].style.position = 'absolute';
        flask.children[0].style.top = '-54px';
    })
}