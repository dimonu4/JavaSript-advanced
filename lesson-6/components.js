Vue.component('component-one', {
    template: `<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci alias animi delectus ducimus ex in laudantium, nam qui sunt temporibus veritatis vitae. Aliquam eaque et ipsam nemo odit similique voluptate!</div>`
});
Vue.component('component-two', {
    template: `<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci architecto at aut blanditiis culpa cum dignissimos doloribus eaque, esse hic incidunt laboriosam mollitia nihil, placeat quae qui quidem ut!</div></div>`
});
Vue.component('component-three', {
    template: `<div>Lorem ipsum dolor sit amet, ptate!</div>`
});

const childElement = {
    name: 'child-element',
    template: '<p>some in child component</p>',
};

Vue.component('some-el', {
    props: ['title', 'counter', 'increase'],
    data() {
        return {
            counterCopy: this.counter,
            // title: 'Hello Component!',
        };
    },
    components: {
      childElement,
    },
    template: `<div>
                    <slot>
                        <p>Default</p>                    
                    </slot>
                    <h1>{{ title }}</h1>
                    <child-element></child-element>
                    <slot></slot>
<!--                    <p>{{ counter }}</p>-->
<!--                    <p>{{ counterCopy }}</p>-->
<!--                    <button @click="counter++">Increase</button>-->
<!--                    <button @click="counterCopy++">Increase</button>-->
<!--                    <button @click="increase()">Increase</button>-->
<!--                    <button @click="$parent.increase">Increase</button>-->
<!--                    <button @click="$emit('increase')">Increase</button>-->
                </div>`,
    mounted() {
        // console.log(this);
        // console.log(this.counter);
        // this.counterCopy = this.counter;
    }
});
