Vue.component('search',{
    data(){
        return{
            searchField:'',
        }
    },
    template:`
    <form action='#' v-on:submit='$parent.$refs.products.search(searchField)'>
    <input type='text' v-model='searchField'>
    <button type='submit'>Search</button>
    </form>
    `
})