# Vue test

*  <a href="生命週期">生命週期</a>
*  <a href="#v-bind">v-bind</a>
*  <a href="#v-if">v-if</a>
*  <a href="#v-for">v-for</a>
*  <a href="#v-on">v-on</a>
*  <a href="#v-model">v-model</a>
*  <a href="#watch">watch</a>
*  <a href="#Component">Component</a>
*  <a href="#接取component的資料emit">接取Component的資料($emit)</a>

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
<img src="https://i.imgur.com/fCQYMmm.png" height="300">  

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
```
<button v-on:click="doSomething()">Click</button>
<button @click="doSomething()">Click</button>
```
## v-model
**雙向綁定(哪邊改變都會修改兩邊的值)**  
*  v-model="變數"
```
<input v-model="message">
{{ message }}
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