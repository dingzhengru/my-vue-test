var app = new Vue({
    el: '#app', 
    data: {
        message: 'Hello Vue!'
    }
});

var app2 = new Vue({
    el: '#app2', 
    data: {
        seen: true
    }
});

var app3 = new Vue({
    el: '#app3',
    data: {
        todos: [
            { text: 'Learn JavaScript' },
            { text: 'Learn Vue' },
            { text: 'Build something awesome' }
        ]
    }
});

var app4 = new Vue({
    el: '#app4',
    data: {
        message: 'Hello Vue.js'
    },
    methods: {
        reverseMessage: function(){
            this.message = this.message.split('').reverse().join('');
            // split => list "1&2&3".spilit('&') => [1,2,3]
            // reverse => list反轉 [1,2,3].reverse() => [3,2,1]
            // join => list轉成字串 [1,2,3].join(',') => "1,2,3"
        }
    }
});

var app5 = new Vue({
    el: '#app5',
    data: {
        message: 'Hi v-model'
    }
});


// component, templates, props
Vue.component('greeter', {
    props: ['name'], 
    template: '<div> Hello, {{ name }}!</div>'
});

// 也可以直接帶入對應的CSS Selector
// Vue.component('my-component', {
//   template: '#my-component'
// });

// 若是想再自定義的標籤內放code的話 可以用inline-template
// <greeter inline-template> <p>code</p> </greeter>


var app6 = new Vue({
    el: '#app6',
    data: {
        
    }
});

var obj = { foo: 'foo' }
Object.freeze(obj) // 凍結 不再變動

var app7 = new Vue({
    el: '#app7',
    data: obj
});


// *Data and Methods
var d = { a: 1 }
var vm = new Vue({ data: d });
// vm.a == data.a  => true
// vm.a = 2
// data.a   => 2  雙邊綁定，哪邊改動另一邊也會改
// ... and vice-versa
// data.a = 3
// vm.a     => 3  如上所說，反過來也是

// Vue 使用$代表是Vue"本身"的屬性與方法，用於"區別"使用者自己定義的屬性
// vm.$data === data // => true
// vm.$el === document.getElementById('example') // => true

// *Instance Lifecycle Hooks (生命週期)
new Vue({
    data: { a: 1 },
    beforeCreate: function() { console.log('beforeCreate'); },
    created: function() { console.log('created'); },
    beforeMount: function(){ console.log('beforeMount'); },
    mounted: function(){ console.log('mounted'); },
    beforeDestory: function(){ console.log('beforeDestory'); },
    destory: function(){ console.log('destory'); }
})

// *Template Syntax
var app8 = new Vue({
    el: '#app8',
    data: { 
        msg: 'content' ,
        rawHtml: '<span style="color: red">This should be red.</span>',
        isButtonDisabled: true, 
        number: 1,
        url: '/',
        onSubmit: function() {
            console.log('Submit');
        },
        doSomething: function(e) {
            console.log(e);
        },
        attr: 'href',
        e: 'mouseover'
    }
});

// Computed Properties and Watchers https://vuejs.org/v2/guide/computed.html#Computed-Caching-vs-Methods
// Computed 與 Methods的差別: https://ithelp.ithome.com.tw/articles/10191808
// Computed 會一直持續更新裡面的屬性，Methods是每次都重新計算

// Watch 可讓我們監視某個值，當這個值變動的時候，就去做某些事情。
// 前端是利用"v-model"綁定
// Regex: \d=[0-9] \D=[^0-9]
var app9 = new Vue({
    el: '#app9',
    data: { 
        msg: 'message',
        username: '',
        errMsg: ''
    },
    methods: {
        reverseText: function(text) {
            return String(text).split('').reverse().join('');
        },
        usernameValid: function(username){
            // return /^[^0-9]\S*/.test(username);

            var errMsg = [];
            if(!username) { errMsg.push('不可為空'); }
            if(/^[0-9]/.test(username)) { errMsg.push('使用者名稱開頭不可為數字'); }
            if(/\s/.test(username)) { errMsg.push('不可以有特殊字元'); }
            if(!errMsg || errMsg.length == 0) { errMsg.push('合法的使用者名稱') }
            return errMsg.join(', ');
        }
    },
    watch: {
        username: function(username) {
            // this.errMsg = '確認合法性...'
            this.errMsg = this.usernameValid(username);
        }
    }
});
var app10 = new Vue({
    el: '#app10',
    data: {
        isGood: false,
        hasError: true,
        error: null,
        activeClass: 'static',
        errorClass: 'text-danger',
        activeColor: 'green',
        activeFontSize: 28,
        classObject: {
            isGood: true,
            hasError: false
        },
        classFunction: function() {
            return {
                'static': this.isGood && !this.error,
                'text-danger': this.error
            }
        }
    }
});

var app11 = new Vue({
    el: '#app11',
    data: {
        // floor 無條件捨去 ceil 無條件進位 round 四捨五入
        // Math.random() => 0~1
        // Math.floor(Math.random()*4) => 0~4
        type: '',
        types: ['A', 'B', 'C', 'D']
    },
    created: function() { 
        this.type = this.types[Math.floor(Math.random()*4)];
    }
});

var app12 = new Vue({
    el: '#app12',
    data: {
        items: [
            { message: 'foo' },
            { message: 'bar' }
        ],
        obj: {
            title: 'How to do lists in Vue',
            author: 'Jane Doe',
            publishedAt: '2016-04-10'
        }
    },
    methods: {
        setNewItems: function() {
            // can use push() pop() shift() unshift() splice() sort() reverse()
            // Vue.set() = vm.$set()
            // Vue.set(this.items, indexOfItem, newValue)
            var newItems = [
                { message: 'new foo' },
                { message: 'new bar' }
            ];
            this.items = newItems;
        },
        setOldItems: function() {
            Vue.set(this.items, 0, { message: 'foo' });
            Vue.set(this.items, 1, { message: 'bar' });
        },
        setNewObject: function(){
            Vue.set(this.obj, 'author', 'Ding');
            Vue.set(this.obj, 'age', 18);
        },
        setOldObject: function(){
            this.obj = {
                title: 'How to do lists in Vue',
                author: 'Jane Doe',
                publishedAt: '2016-04-10'
            }
        }
    }
});

var app13 = new Vue({
    el: '#app13',
    data: {
        numbers: [1,2,3,4,5,6,7,8,9],
    }, 
    methods:{
        even: function(list) {
            return list.filter(function (n) {
                return n % 2 === 0;
            })
        }
    }
})

var app14 = new Vue({
    el: '#app14',
    data: {
        inputText: '',
        nodes: [
            { text: 'defaultNode01' },
            { text: 'defaultNode02' },
            { text: 'defaultNode03' },
        ]
    },
    methods: {
        addNode: function(node) {
            this.nodes.push(node);
        },
        removeNode: function(node, index) {
            console.log('remove:', index);
            // use indexOf to get index by node
            // then remove by index
            this.nodes.splice(this.nodes.indexOf(node), 1);
        }
    }
})

var app15 = new Vue({
    el: '#app15',
    data: {
        // all event: https://developer.mozilla.org/en-US/docs/Web/Events
        // all event object: https://www.w3schools.com/jsref/obj_event.asp
        clickEvent: function(event) {
            console.log(event.type); // click
            console.log(event.target);
            console.log(event.target.tagName); // button
            console.log(event.target.id); // 123123
            console.log(event.target.style.color); // red
        }
    }
})