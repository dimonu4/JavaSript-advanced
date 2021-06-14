Vue.component('products',{
    data(){
        return{
            products:[],
            filtered:[],
        }
    },
    methods:{
        search(searchWord){
            let reg= new RegExp(searchWord,"i");
            this.filtered=this.products.filter(el=>reg.test(el.title));
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
        .then(data=>{
            for(let el of data){
                this.products.push(el);
                this.filtered.push(el);
            }
        })
    },

    template:` 
    <section class="section section--items">
     <div class="container">
        <h2 class="items__title">Fetured items</h2>
        <h3 class="items__subtitle">Shop for items based on what we featured in this week</h3>
        <div class="row"> 
        <product v-for="item of filtered" :key="item.id" :product="item" :imgSource="item.imgSource"></product>
        </div>
        <div class="btn__catalog">
            <button class="btn__link">Browse All
                Product</button>
        </div>
     </div>
    </section>
    `,

});
 
Vue.component('product',{
    props:["product","imgSource"],
    data(){
        return {
            APIcart: this.$root.$refs.cart,
        }
    },
    template:`
    <div class="col-12 col-md-6 col-xl-4">
      <figure class="items__card">
        <div class="card__picture">
            <img :src="imgSource" class="card__image" alt="card-1">
            <div class="card__hover d-flex justify-content-center align-items-center">
                <button class="card__btn d-flex align-items-center" @click="APIcart.addProduct(product)">
                    <i class="fas fa-shopping-cart card__btn__icon"></i>
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
        <figcaption class="card__info">
            <p class="card__title">{{product.title}}</p>
            <p class="card__description">{{product.description}}</p>
            <p class="card__price">{{product.price}}$</p>
        </figcaption>
      </figure>
    </div>
    `
})