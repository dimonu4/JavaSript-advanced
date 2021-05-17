Vue.component('error',{
    data(){
        return{
             error:"",
        }
    },
    template:`<p>{{error}}</p>`,
    methods:{
        showError(errorText){
            this.error=errorText;
        }
    },
  
})