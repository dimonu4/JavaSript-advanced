const app = new Vue({
    el: '#app',
    data:{},
    methods:{
        getJson(url){
            return fetch(url)
            .then(result=>result.json())
            .catch(err=>{
                this.$refs.error.setError(err);
            })
        },
        postJson(url,data){
            return fetch(url,{
                method:'POST',
                headers: {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data),
            }).then(result=>result.json())
            .catch(err=>{
                this.$refs.error.setError(err);
            })
        },
        putJson(url,data){
            return fetch(url,{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data),
            }).then(result=>result.json())
            .catch(err=>{
                this.$refs.error.setError(err);
            })
        },
        removeJson(url,data){
            return fetch(url,{
                method:'DELETE',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data),
            }).then(result=>result.json())
            .catch(err=>{
                this.$refs.error.setError(err);
            })
        }
                
    },
    mounted(){
    }

})