// class ProductList {
//   #goods;
//   #allProducts;
//   #privateProp;
//
//   constructor(container = '.products') {
//     this.container = container;
//     this.#goods = []; // data
//     this.#allProducts = []; // массив экземпляров товаров на основе this._goods
//
//     this.#fetchGoods();
//     this.#render();
//   }
//
//   get prop() {
//     return this.#privateProp;
//   }
//
//   set prop(value) {
//     if (value > 100) throw new Error('Значение больше 100');
//     this.#privateProp = value;
//   }
//
//   #fetchGoods() {
//     this.#goods = [
//       {id: 1, title: 'Notebook', price: 20000},
//       {id: 2, title: 'Mouse', price: 1500},
//       {id: 3, title: 'Keyboard', price: 5000},
//       {id: 4, title: 'Gamepad', price: 4500},
//     ];
//   }
//
//   #render() {
//     const block = document.querySelector(this.container);
//
//     for (const product of this.#goods) {
//       // console.log(new ProductItem(product).render());
//       const productObject = new ProductItem(product);
//
//       this.#allProducts.push(productObject);
//       block.insertAdjacentHTML('beforeend', productObject.render());
//     }
//   }
// }
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// В ДЗ переделать на промисы не используя fetch
// var getRequest = (url, callBack) => {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         callBack(xhr.responseText);
//       }
//     }
//   };
//   xhr.send();
// }

// Дз №1:
let getRequest =(url)=>{
   return new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.onreadystatechange= () =>{
      if(xhr.readyState === 4){
        if(xhr.status !== 200){
          reject ('Error');
        } else{
          resolve(xhr.responseText);
        }
      }
    };
    xhr.send();
   });
}

// getRequest(`${API}/catalogData.json`).then((data)=>{
//   this._goods = JSON.parse(data);
//   this._render();
// }).catch((error)=>{
//   console.log(error);
// });
//- - - - - - - - - - - - - - - - - - - - - - - - - -

class ProductList {
  constructor(container='.products') {
    this.container = container;
    this._goods = []; // data
    this._allProducts = []; // массив экземпляров товаров на основе this._goods
    this.APIaddress= '/catalogData.json';

    // this._fetchGoods();
    // this._render();
    this._getGoods()
        .then((data) => {
          this._goods = data;
          this._render();
          this.btnBuyInit();
        });
    
  }

  btnBuyInit(){
    let btns = document.querySelectorAll('.buy-btn');
    for(let btn of btns){
      btn.addEventListener('click', (event)=>{
      basketList.addToBasket(event);
      });
    }
  }

  sum() {
    return this._goods.reduce((sum, { price }) => sum + price, 0);
  }

  //  _fetchGoods() {
  //   getRequest(`${API}/catalogData.json`).then((data)=>{
  //     this._goods = JSON.parse(data);
  //     this._render();
  //   }).catch((error)=>{
  //     console.log(error);
  //   });
  // }
  //   getRequest(API + '/catalogData.json', function (data) {
  //     console.log(data);
  //     this._goods = JSON.parse(data);
  //     console.log(this._goods);
  //     this._render();
  //   }.bind(this));
  // }
  _getGoods() {
    return fetch(`${API}${this.APIaddress}`)
        .then(result => result.json()).catch(error => console.log(error));
  }
  



  _render() {
    const block = document.querySelector(this.container);

    for (const product of this._goods) {
      // console.log(new ProductItem(product).render());
      const productObject = new ProductItem(product);

      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
    this.displayQuantity();
  }
  displayQuantity(){
    let quantityBlocks=document.querySelectorAll('.hidden');
    for(let quantityBlock of quantityBlocks){
    quantityBlock.style.display= 'none';
    }
  }

  hide(){
    const block = document.querySelector(this.container);
    block.style.display= 'none';
  }
}

class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
    this.quantity = product.quantity;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <p class="hidden btn-box">Количество: ${this.quantity}</p>
                    <button class="buy-btn">Купить</button>
                    <button class="del-btn" style= "display:none;">Удалить</button>
                </div>
            </div>`;
  }
}

class basket{
  constructor(){
    this.container= '.basket';
    this._busketGoods = []; 
    this.APIaddress= '/getBasket.json';
    this.renderEmptyBasket();
    this.buttonInit();    
  }

  addToBasket(event){
    fetch(`${API}/addToBasket.json`)
    .then(result=>result.json()).then(
      (data)=>{
      if(data.result){
        event.target.innerHTML= 'Добавлено в корзину';
      }
      this._getBasketGoods();
    }
    ).catch(error=>console.log(error));
  }

  _renderBasket(){
    const block = document.querySelector(this.container);
    block.insertAdjacentHTML('beforeend', this._busketGoods);
  }
  _getBasketGoods(){
    fetch(`${API}${this.APIaddress}`)
    .then(result=>result.json()).then((data)=>{
      this._busketGoods= data;
      
      })
      .catch(error=>console.log(error));
  }

  showBasket(){
    this._renderBasket();
    catalog.hide();
    const block = document.querySelector(this.container);
    block.style.display= 'block';
  }

  buttonInit(){
    document.querySelector('.btn-cart').addEventListener('click', ()=>this.showBasket());
  }
  renderEmptyBasket(){
    const block = document.querySelector(this.container);
    block.insertAdjacentHTML('beforeend', this._busketGoods);
    block.style.display= 'none';
  }

  _renderBasket() {
    const block = document.querySelector(this.container);
    for (const product of this._busketGoods.contents) {
      const productObject = new ProductItem(product);
      block.insertAdjacentHTML('beforeend', productObject.render());
     }
    this.displayQuantity();
    this.createDelBtn();
     }
     
  displayQuantity(){
    document.querySelector('.hidden').style.display= 'block';
  }

  createDelBtn(){
    let btns = document.querySelectorAll('.del-btn');
    for(let btn of btns){
      btn.style.display='block';
      btn.addEventListener('click', (event)=>{
        this.deleteFromBusket(event);
      })
    }
  }

  deleteFromBusket(event){
    fetch(`${API}/deleteFromBasket.json`)
    .then(result=>result.json())
    .then(data=>{
      if(data.result){
      event.target.parentNode.parentNode.style.display='none';
      }
    })
    .catch(error=>console.log(error));
  }

  
}

const catalog = new ProductList();
const basketList = new basket();

// document.querySelector('.btn-cart').addEventListener('click', ()=>{const basket1= new basket()});

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://via.placeholder.com/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
// document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);


