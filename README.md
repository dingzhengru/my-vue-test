# Vue test

*  <a href="生命週期">生命週期</a>
*  <a href="#v-bind">v-bind</a>
*  <a href="#v-if">v-if</a>
*  <a href="#v-for">v-for</a>
*  <a href="#v-on">v-on</a>
*  <a href="#v-model">v-model</a>
*  <a href="#computed">computed</a>
*  <a href="#methods">methods</a>
*  <a href="#watch">watch</a>
*  <a href="#animate">animate</a>
*  <a href="#Component">Component</a>
*  <a href="#接取component的資料emit">接取Component的資料($emit)</a>
*  <a href="#動態載入Component">動態載入 Component</a>

```
const app = new Vue({
    el: '#app', 
    router, // vue-router
    store,  // vuex
    components: {},
    data: {
        message: 'Hello Vue!'
    },
    computed: {
        xxxFilter: function() {
            return ...;
        },
        getxxxById: (app) => (id) => {
            // app是指這個app就等於在這裡用的this
            // id是自己設的參數，使用: getxxxById(id)
            return app.data[id];
        }
    },
    methods: {
        xxxMethod: function() {
            // doSomething
        }
    },
    beforeCreate: function() { console.log('beforeCreate'); },
    created: function() { console.log('created'); },
    beforeMount: function(){ console.log('beforeMount'); },
    mounted: function(){ console.log('mounted'); },
    beforeDestory: function(){ console.log('beforeDestory'); },
    destory: function(){ console.log('destory'); },
});
```

## 生命週期
<img src="https://i.imgur.com/fCQYMmm.png" height="700">
來源: https://vuejs.org/v2/guide/instance.html  

## v-bind
*  給予屬性值(非雙向綁定，雙向綁定要用v-model)
*  使用表達式{{}}
```
<div id="app">
    <!-- 表達式 -->
    <p>{{ message }}</p>
    <p>{{ ok ? 'YES' : 'NO' }}</p>


    <!-- 給屬性值 -->
    <p v-bind:data="message"></p>

    <!-- 簡寫 -->
    <p :data="message"></p>

    <!-- 用表達式給屬性值 -->
    <p :data="ok ? 'YES' : 'NO'"></p>
</div>
```

## v-if
*  v-if="表達式", true就顯示, false就不顯示
```
<div id="app2">
    <span v-if="seen">seen = true</span>
    <span v-if="!seen">seen = false</span>
</div>
```

## v-for
*  v-for="value in obj"  
*  v-for="(value, index) in obj"  
*  v-for="(value, key, index) in obj"
*  v-for="n in 10" (run 0-10)  
```
<p v-for="(value, key, index) in obj">
   {{ index }} - {{ key }} - {{ value }}
</p>
```
## v-on
**綁定事件與對應的方法(簡寫 @事件)**  
*  v-on:click="doSomething()"
*  @click="doSomething()"
*  @click="count++"
*  .stop, prevent, .capture, .self, .once, .passive
```
// basic
<button v-on:click="doSomething()">Click</button>
<button @click="doSomething()">Click</button>

// .stop = stoppropagation: 停止事件傳送 (@click.stop="")
// .prevent = preventdefault: 取消原本事件要會做的事 (@submit.prevent="")
// .capture: 本來事件接收是預設在冒泡階段，這會把它改到捕獲階段
// .self: 條件設為event.target為自己的時候才會觸發
// .once: 只會觸發一次
// .passive: 主要用於提升滾動性能(避免手機滑動卡卡的)，做的事等同於下面那行第三個參數

document.addEventListener('touchstart', onTouchStart, {passive: true});

```
## v-model
**雙向綁定(哪邊改變都會修改兩邊的值)**  
*  v-model="變數"
```
<input v-model="message">
{{ message }}
```

## computed
*  回傳運算過後的結果, 使用: getFirst, this.getFirst
*  接收參數用法，```getDataById: (app) => (id) => { ... }```，使用: getDataById(id)
```
const app = new Vue({
    el: '#app',
    data: { 
        list: [1,2,3]
    },
    computed: {
        getFirst: function() {
            return this.list[0]
        }
        getDataById: (app) => (id) => {
            // app是指這個app就等於在這裡用的this
            // id是自己設的參數，使用: getxxxById(id)
            return app.list[id];
        }
    }
}
```
## methods
單純是個放方法的地方，調用: doSomeThing(), this.doSomeThing()  
```
const app = new Vue({
    el: '#app',
    methods: {
        doSomeThing: function() {
            // ...
        }
    }
}
```
## watch
監控某個值，有變化就執行
```
const app = new Vue({
    el: '#app',
    data: { 
        username: ''
    },
    watch: {
        username: function(newValue, oldValue) {
            // ...
        }
    }
}
```

## animate

*  其實只要用transition直接選 all 或只指定變動的屬性(transition: width 0.3s ease-in-out;)
*  剩下就自己指定事件去做屬性變更即可(ex: focus 就把width變大, blur 就把他小回原大小)
*  transition: property || duration || delay || timing-function  [, ...];
*  transition: all 0.5s ease-in-out; / transition: width 0.5s ease-in-out;

```
<input type="text" 
        :style="{ width: inputWidth }" 
        @focus="widenInputWidth()"
        @blur="narrowInputWidth()">

input {
    transition: width 0.3s ease-in-out;
}
```
```
data: {
    inputWidth: '100px'
},
methods: {
    widenInputWidth: function() {
        this.inputWidth = '300px';
    },
    narrowInputWidth: function() {
        this.inputWidth = '100px';
    }
}
```

## Component
**組件, 可自製的Tag(以前端來看)**  
*  讓模板可讀性更高，更簡潔
*  適合大量重複使用
*  props屬性，代表這些屬性是需要外部傳入給Component的


```
// 全域宣告
Vue.component('name', {}})

// 宣告給變數，再給需要的app
const ComponentName = 
{
    name: 'ComponentName',
    props: {
        data: Array
    },
    template: ``,
    data: function () {
        return {}
    },
    computed: {}
    methods: {}
}

const app = new Vue({
    el: '#app',
    components: {
        ComponentName
    }
})
```

## 接取Component的資料($emit)
**app可以透過設置屬性來傳資料給component，那麼反過來呢，component要如何傳資料給app**  
*  component可以透過$emit()來傳資料給app(在template跟component app中都可以調用)
*  $emit('事件名稱', 參數) or this.$emit
*  template中直接用事件設置，@click="$emit('event-name', payload)"
*  component app中調用，this.$emit('event-name', payload)
*  接component資料時，設置屬性並用方法去接，@event-name="doSomething"
html  
```
<event-blog-post
    @add-count="onAddCount"
></event-blog-post>
```
component  
```
Vue.component('event-blog-post', {
    props: ['post'],
    template: `
        <div>
            <button @click="$emit('add-count', 2)">add Count</button>
        </div>
    `
})
```
app.js  
```
const app = new Vue({
    el: '#app',
    data: {
        count: 0
    }
    methods: {
        onAddCount: function (count) {
            this.count = count;
        }
    }
})
```

## 動態載入Component
* 使用到時才會載入
* 動態載入語法一律是: ```() => import(`@/components/LayoutZ.vue`)```
* 可以用 :is 來切換 component
* 參考此答案: https://stackoverflow.com/a/53406634/5134658


``` js
export default {
  components: {
    'test-dynamic': () => import('@/components/testDynamic'),
    'other-dynamic': () => import('@/components/otherDynamic')
  },
  data () {
    return {
      current: 'test-dynamic'
    }
  }
}
```

可以用 :is 來切換
``` xml
<component :is="current"></component>
```