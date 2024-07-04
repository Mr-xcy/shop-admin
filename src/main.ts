import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/es/locale/lang/zh-cn' //配置国际化
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
// 全局注册组件
import gloalComponent from './components';
import '@/styles/index.scss';
import router from './router';
import pinia from './store';

const app = createApp(App)

app.use(ElementPlus)
// app.use(ElementPlus, {
//   locale: zhCn,
// })
app.use(gloalComponent);
app.use(router);
app.use(pinia);
//引入路由鉴权文件
import './permisstion'
app.mount('#app')
