Vue.component('error',{
    data(){
        return {
            text:'',
        }
    },
    methods:{
        setError(error){
            this.text= error;
        }
    },
    computed:{
        isVisible(){
            return this.text!==''
        }
    },
    template:`
    <div class="error_block" v-if="isVisible">
    <p class="err_text">{{text}}</p>
    <button v-on:click="setError('')">Close</button>
    </div>
    `
})