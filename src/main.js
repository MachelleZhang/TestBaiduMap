import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//采用事件总线的形式，传递组件间的事件响应
let $bus = new Vue();
Vue.prototype.$bus = $bus;

new Vue({
  render: h => h(App),
}).$mount('#app')
