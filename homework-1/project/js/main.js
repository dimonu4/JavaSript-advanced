'use strict';
const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];
// Параметр  img будет иметь значение по умолчанию и будет выводить определённое изображение
// Параметр  title будет иметь значение по умолчанию "Наименование товара"
const renderProduct = (title ="Наименование товара", price, img = "https://picsum.photos/200/300") => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <figure>
                <img class="cart-img" src="${img}" alt="${title}">
                </figure>
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

 // Сократим запись стрелочной ф-ции убрав круглые и фигурные скобки и return
const renderProducts = (list = []) => {
    const productList = list.map(item => renderProduct(item.title, item.price));
    // let productList = [];

    // for (let i = 0; i < list.length; i++) {
    //     productList.push(renderProduct(list[i].title, list[i].price));
    // }
    // for (const item of list) {
    //     productList.push(renderProduct(item.title, item.price));
    // }

    // document.querySelector('.products').innerHTML = productList;
    // console.log(productList);

    // Чтобы избавится от "," вместо того чтобы выводить весь массив целиком
    // выводим все элементы поочередно с помощью forEach и insertAdjacentHTML
    productList.forEach(item => document.querySelector('.products').insertAdjacentHTML('afterbegin',item));
}

renderProducts(products);
