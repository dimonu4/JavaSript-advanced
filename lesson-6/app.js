const app = new Vue({
    el: '#app',
    data: {
        title: 'Hello Component!',
        counter: 0,
        tabs: ['one', 'two', 'three'],
        currentTab: 'one',
    },
    methods: {
        increase() {
            this.counter++;
        }
    },
    computed: {
        componentName() {
            return `component-${this.currentTab}`;
        },
    },
    mounted() {
        // console.log(this);
    },
});
