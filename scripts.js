// Массив объектов продукта с URL-адресами изображений
const products = [
    { name: 'Nvidia GeForce RTX 3080', imageUrl: 'rtx3080.png', price: 54000 },
    { name: 'AMD RX 6800 XT', imageUrl: 'rx6800xt.png', price: 22000 },
    { name: 'Intel CORE i9', imageUrl: 'intelxe.png', price: 19000 },
    { name: 'Nvidia GTX 1660 Ti', imageUrl: 'gtx1660ti.png', price: 20000 },
    { name: 'AMD Radeon Rx 570', imageUrl: 'RadeonRx570Amd.png', price: 9000 },
    { name: 'Nvidia GTX 1060', imageUrl: 'GTX 1060.png', price: 8200 },
    { name: 'AMD RX 6600 XT', imageUrl: 'rx6600xt.png', price: 30000 },
    { name: 'Intel Core i3', imageUrl: 'IntelCorei3.png' , price: 14000},
    { name: 'Nvidia GeForce RTX 2080', imageUrl: 'RTX2080.png', price: 34000},
    { name: 'Intel Core i7', imageUrl: 'IntelCorei7.png', price: 17500 }
];

// Функция для динамической загрузки изображений и кнопок товаров
function loadProducts() {
    const productsSection = document.getElementById('products-section');
    const productsSection2 = document.getElementById('products-section-2');
    
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        const productName = document.createElement('h2');
        productName.textContent = product.name;
        
        const productImage = document.createElement('img');
        productImage.src = `images/${product.imageUrl}`;
        productImage.alt = product.name;
        
        const buyButton = document.createElement('button');
        buyButton.textContent = 'Купить'; // Устанавливаем текст кнопки

        // Прослушиватель событий нажатия кнопки
        buyButton.addEventListener('click', function() {
        });
        
        productDiv.appendChild(productName);
        productDiv.appendChild(productImage);
        productDiv.appendChild(buyButton); // Добавляем кнопку в div продукта
        
        if (index < 5) {
            productsSection.appendChild(productDiv); // Добавляем первые 5 товаров в первую строку
        } else {
            productsSection2.appendChild(productDiv); // Добавляем следующие 5 товаров во вторую строку
        }
    });
}

// Функция для установки обработчиков событий для кнопок "Купить"
function setupButtons() {
    const buyButtons = document.querySelectorAll('.product button');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.parentNode.querySelector('h2').textContent;
            const product = products.find(product => product.name === productName);
            buyProduct(product);
        });
    });
}

// Функция для фильтрации продуктов по производителю
function filterProducts(manufacturer) {
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(manufacturer.toLowerCase()));
    renderProducts(filteredProducts);
}

// Функция для сброса фильтра
function resetFilter() {
    renderProducts(products);
}

// Функция для отображения продуктов
function renderProducts(productsToShow) {
    const productsSection1 = document.getElementById('products-section');
    const productsSection2 = document.getElementById('products-section-2');
    // Удаляем все продукты из обоих разделов
    productsSection1.innerHTML = '';
    productsSection2.innerHTML = '';

    productsToShow.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productName = document.createElement('h2');
        productName.textContent = product.name;

        const productImage = document.createElement('img');
        productImage.src = `images/${product.imageUrl}`;
        productImage.alt = product.name;

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Добавить в корзину';
        buyButton.addEventListener('click', () => buyProduct(product));

        productDiv.appendChild(productName);
        productDiv.appendChild(productImage);
        productDiv.appendChild(buyButton);

        // Распределяем продукты по разным секциям в зависимости от индекса
        if (index < 5) {
            productsSection1.appendChild(productDiv);
        } else {
            productsSection2.appendChild(productDiv);
        }
    });
}

// Объект корзины товаров
const cart = [];

// Функция для добавления товара в корзину
function addToCart(product) {
    cart.push(product);
    renderCart();
}

// Функция для отображения корзины
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Очищаем предыдущий контент корзины

    cart.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - Цена: ${product.price} руб.`; // Добавляем цену товара
        cartItems.appendChild(li);
    });
    updateTotalPrice(); // Вызываем функцию для обновления общей стоимости
}

// Функция для обновления общей стоимости
function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = cart.reduce((total, product) => total + product.price, 0);
    totalPriceElement.textContent = totalPrice; // Обновляем общую стоимость
}

// Функция для обработки нажатия кнопки "Купить"
function buyProduct(product) {
    addToCart(product);
    updateTotalPrice(); // Обновляем общую стоимость после добавления товара
}

// Вызываем все необходимые функции при загрузке страницы
window.onload = function() {
    loadProducts();
    setupButtons();
    renderProducts(products);
};
// JavaScript to add rotation class to the logo
const nvidiaLogo = document.querySelector('.nvidia-logo');
nvidiaLogo.classList.add('rotate');

// Находим кнопку "Оформить заказ"
const checkoutButton = document.getElementById('checkout-button');

// Добавляем обработчик события для нажатия на кнопку "Оформить заказ"
checkoutButton.addEventListener('click', function() {
    // Вызываем функцию для обработки оформления заказа
    checkout();
});

// Функция для оформления заказа
function checkout() {
    // Проверяем, есть ли товары в корзине
    if (cart.length === 0) {
        alert("Ваша корзина пуста!");
        return;
    }

    // Вычисляем общую стоимость товаров в корзине
    const totalPrice = cart.reduce((total, product) => total + product.price, 0);

    // Выводим сообщение о успешной покупке с ценой
    alert(`Спасибо за покупку! Общая сумма заказа: ${totalPrice} руб.`);
    
    // Очищаем корзину после оформления заказа
    cart.length = 0;
    renderCart(); // Обновляем отображение корзины
}
