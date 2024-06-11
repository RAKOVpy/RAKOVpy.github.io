document.addEventListener('DOMContentLoaded', function () {
    let tg = window.Telegram.WebApp;
    tg.expand();

    const buttons = document.querySelectorAll('.buy-button');
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const cartMenu = document.querySelector('.cart-menu');
    const cartIcon = document.querySelector('.cart-icon');
    const buyButton =  document.querySelector('.checkout-button'); 

    const infoAppendMenu = document.querySelector('.cart-ok-append');

    const products = [
        { id: 1, name: 'Мобильный Телефон 1' },
        { id: 2, name: 'Мобильный Телефон 2' },
        { id: 3, name: 'Мобильный Телефон 3' }
    ];

 

    let cart = [];

    const closeCartButton = document.querySelector('.close-cart');
    const cartAppend = document.querySelectorAll('.buy-button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.closest('.product').dataset.id;
            const product = products.find(p => p.id == productId);
            addToCart(product);
        });
    });

    cartIcon.addEventListener('click', function () {
        cartMenu.classList.toggle('open');
    });


    closeCartButton.addEventListener('click', function () {
        cartMenu.classList.remove('open');
    });


    buyButton.addEventListener('click', function () {
        var cart_ = cart.map(function(name) {
            return name.id;
          });
        tg.sendData(JSON.stringify(cart_));
    });


    // cartAppend.addEventListener('click', function () {
    //     infoAppendMenu.classList.toggle('open');
    //     // infoAppendMenu.classList.remove('open');

    //     setTimeout(function() {
    //         infoAppendMenu.classList.remove('open');
    //     }, 1000); // 10000 миллисекунд = 10 секунд
    // });


    // buttons.addEventListener('click', function () {
    //     cartAppend.classList.toggle('open');
    // });


    // buttons.addEventListener('click', function () {
    //     cartAppend.classList.remove('open');
    // }, 1000);


    function addToCart(product) {
        cart.push(product);
        updateCart();
        AppendCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function AppendCart(){
        infoAppendMenu.classList.toggle('open');
        // infoAppendMenu.classList.remove('open');

        setTimeout(function() {
            infoAppendMenu.classList.remove('open');
        }, 1000); // 10000 миллисекунд = 10 секунд
    }

    function updateCart() {
        // cartCount.textContent = cart.length;

        cartItems.innerHTML = '';
        cart.forEach((product, index) => {
            const li = document.createElement('li');
            li.textContent = product.name;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить';
            removeButton.addEventListener('click', function () {
                removeFromCart(index);
            });
            li.appendChild(removeButton);
            cartItems.appendChild(li);
        });
    }


    // const fetch = require('node-fetch');
    // const token = '7390673577:AAGDg1f_94b3RMwOIbDNHR1kB2ZcuOIGh_0';
    // const apiUrl = `https://api.telegram.org/bot${token}`;

    // const ans = fetch(`${apiUrl}/getUserProfilePhotos?user_id=${453576246}`);

    // console.log(ans);




    const TELEGRAM_API_TOKEN = '7390673577:AAGDg1f_94b3RMwOIbDNHR1kB2ZcuOIGh_0';
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}`;

    async function getUserProfilePhotos(userId) {
        const url = `${TELEGRAM_API_URL}/getUserProfilePhotos?user_id=${userId}&limit=1`;
        const response = await fetch(url);
        const data = await response.json();
        return data.result.photos;
    }

    async function getFileUrl(fileId) {
        const url = `${TELEGRAM_API_URL}/getFile?file_id=${fileId}`;
        const response = await fetch(url);
        const data = await response.json();
        const filePath = data.result.file_path;
        return `https://api.telegram.org/file/bot${TELEGRAM_API_TOKEN}/${filePath}`;
    }

    async function displayProfilePhoto(userId) {
        const photos = await getUserProfilePhotos(userId);

        if (photos.length > 0) {
            const photo = photos[0]; // Берем первую фотографию
            const fileId = photo[photo.length - 1].file_id; // Берем последнюю версию фото (большого размера)
            const fileUrl = await getFileUrl(fileId);
            
            console.log(fileUrl)

            const img = document.createElement('img');
            img.src = fileUrl;
            img.alt = 'Profile Photo';
            img.className = 'img-user'
            document.getElementById('profile-user').appendChild(img);
        } else {
            const message = document.createElement('p');
            message.textContent = `У пользователя ${userId} нет фотографий профиля.`;
            document.getElementById('profile-user').appendChild(message);
        }
    }

    // Пример использования функции displayProfilePhoto
    const userId = 453576246; // Укажите ID пользователя
    displayProfilePhoto(userId);









    let personCard = document.getElementById("profile-user");

    // const { first_name, last_name, username, photo_url } = tg.initDataUnsafe.user;

    let p_person = document.createElement('p');

    p_person.innerText = `${tg.initDataUnsafe.user.first_name}`;

    personCard.appendChild(img_person);
    personCard.appendChild(p_person);

    
    

});
