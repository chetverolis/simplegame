// Переключение скина
function save_skin() {
    let value = document.querySelector('input[name="field"]:checked'),
        url = '';

    if (value) {
        value = value.getAttribute('id');
        let link = document.createElement('link');
        function skin_remove() {
            let new_links = document.querySelectorAll('link[skin_check="1"]');
            
            for (let i = 0; i < new_links.length; i++) {
                if (new_links[i]) {
                    new_links[i].remove();
                }
            }
        }

        if (value == 'skin_default') {
            skin_remove();
        } else if (value == 'skin_dark') {
            skin_remove();
            url = 'assets/css/skins/dark.css';
        } else if (value == 'skin_minecraft') {
            skin_remove();
            url = 'assets/css/skins/minecraft.css';
        } else if (value == 'skin_warcraft') {
            skin_remove();
            url = 'assets/css/skins/warcraft.css';
        }

        if (value != 'skin_default') {
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', `${url}`);
            link.setAttribute('skin_check', '1');
            document.head.appendChild(link);
        }

        let date = new Date(Date.now() + 86400e3);
        date = date.toUTCString();
        document.cookie = 'skin='+ value +'; expires=' + date;
    }
}

function skin_load() {
    let value = String(document.cookie).substring(5,),
        link = document.createElement('link'),
        url = '';
    
    function skin_remove() {
        let new_links = document.querySelectorAll('link[skin_check="1"]');
        
        for (let i = 0; i < new_links.length; i++) {
            if (new_links[i]) {
                new_links[i].remove();
            }
        }
    }

    if (value == 'skin_default') {
        skin_remove();
    } else if (value == 'skin_dark') {
        skin_remove();
        url = 'assets/css/skins/dark.css';
    } else if (value == 'skin_minecraft') {
        skin_remove();
        url = 'assets/css/skins/minecraft.css';
    } else if (value == 'skin_warcraft') {
        skin_remove();
        url = 'assets/css/skins/warcraft.css';
    }

    if (value != 'skin_default' && url != '') {
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', `${url}`);
        link.setAttribute('skin_check', '1');
        document.head.appendChild(link);
    }
}