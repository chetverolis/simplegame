// Переключение скина
function save_skin() {
    var v = document.querySelector('input[name="field"]:checked').getAttribute('id');
    let link = document.createElement('link'),
        url = '';

    function skin_remove() {
        let new_links = document.querySelectorAll('link[skin_check="1"]');
        
        for (let i = 0; i < new_links.length; i++) {
            if (new_links[i]) {
                new_links[i].remove();
            }
        }
    }

    if (v == 'skin_default') {
        skin_remove();
    } else if (v == 'skin_dark') {
        skin_remove();
        url = 'assets/css/skins/dark.css';
    } else if (v == 'skin_minecraft') {
        skin_remove();
        url = 'assets/css/skins/minecraft.css';
    } else if (v == 'skin_warcraft') {
        skin_remove();
        url = 'assets/css/skins/warcraft.css';
    }

    if (v != 'skin_default') {
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', `${url}`);
        link.setAttribute('skin_check', '1');
        document.head.appendChild(link);
    }
}