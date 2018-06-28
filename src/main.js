// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Dialog,Checkbox,Radio,CheckboxGroup,Button,Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'

Vue.use(Dialog);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(CheckboxGroup);
Vue.use(Button);
Vue.use(Dialog);
Vue.prototype.$message = Message;


var html = document.getElementsByTagName("html")[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = oWidth/375*100 + "px";
    console.log(html.style.fontSize)

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
