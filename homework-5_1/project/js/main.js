const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    products: [],
    filtered:[],
    imgCatalog: 'https://via.placehold.it/200x150',
    searchLine:'',
    filterClick: false,
    isVisibleCart: false, 
    cart:[],
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },

    // Задание №1 Метод для поиска
    FilterGoods(){
      this.filterClick= true;
      let regExp = new RegExp(this.searchLine, 'i');
       this.filtered= this.products.filter((el)=>{
        return regExp.test(el.product_name);
      }); 
    },
    // Задание №2 Корзина
    addProduct(product){
      for(let el of this.cart){
        if(el.id_product===product.id_product){
          el.quantity+=1;
        }
      }
    },
    CartVisibilty(){

      this.isVisibleCart==true?this.isVisibleCart=false:this.isVisibleCart=true;
      console.log(this.cart)
    },
    // Задание №3
    isZero(){
      let count = 0;
      for(let product of cart){
        if (product.quantity<1){
          count++
      }
    }
    if (count>0){
      return false;
    }else{
      return true;
    }
  }
  },

  beforeCreate() {},
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
      });
    this.getJson(`${API + this.cartUrl}`)
      .then(data=>{
        for(let el of data.contents){
          this.cart.push(el);
        }
      })
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
});
