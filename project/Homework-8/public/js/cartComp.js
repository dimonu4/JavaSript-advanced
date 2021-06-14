Vue.component('cart',{
    data(){
        return {
            cartItems:[],
            isShown:false,
        }
    },
    methods:{
        addProduct(product){
            let find= this.cartItems.find(el=>el.id === product.id);
            if(find){
                this.$parent.putJson(`api/cart/${find.id}`,{quantity:1})
                .then(data=>{
                    if(data.status===1){
                        find.quantity+=1;
                    }
                });
            }else{
                let prod= Object.assign({quantity:1},product);
                this.$parent.postJson('api/cart',prod)
                .then(data=>{
                    if(data.status===1){
                        this.cartItems.push(prod);
                    }
                })
            }
        },
        remove(item){
            let find= this.cartItems.find(el=>el.id===item.id);
            let index= this.cartItems.indexOf(find);
           if(item.quantity>1){
               this.$parent.putJson(`api/cart/${item.id}`,{quantity:-1})
               .then(data=>{
                   if(data.status===1){
                       item.quantity -=1;
                   }
               })
           }else{
               this.$parent.removeJson(`api/cart/${find.id}`)
               .then(data=>{
                   if(data.status===1){
                        this.cartItems.splice(index,1);
                   }
               })
           }

        }
    },
    mounted(){
        this.$parent.getJson('/api/cart')
        .then(data=>{
            for(let el of data){
                this.cartItems.push(el);
            }
        })
    },
    template:`
    <div>
    <button v-on:click="isShown = !isShown">Корзина</button>
    <div class="cart-block" v-show="isShown">
      <p v-if=!cartItems.length>Корзина пустая</p>
      <cart-item v-for="item of cartItems" :key="item.id" :cartItem="item" v-on:remove="remove"></cart-item>
    </div>
    </div>
    `
});

Vue.component('cart-item',{
    props:['cartItem'],
    template:`
    <div class="cart-items">
    <p class="cart-title">{{cartItem.title}}<br>{{cartItem.price}} $ за шт</p>
    <p></p>
        <div class="rightblock">
            <p>Количество: {{cartItem.quantity}}</p>
            <p>{{cartItem.quantity*cartItem.price}} $</p>
            <button v-on:click="$emit('remove',cartItem)">Удалить</button>
        </div>
    </div>
    `
})