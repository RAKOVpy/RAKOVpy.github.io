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


    let personCard = document.getElementById("profile-user");
    let p_person = document.createElement('p');

    p_person.innerText = `${tg.initDataUnsafe.user.first_name}
    ${tg.initDataUnsafe.user.last_name}`
    

    
    personCard.appendChild(p_person)

    // let p_person2 = document.createElement('p');
    // p_person2.innerText = '123'
    // personCard.appendChild(p_person2)
    

});
