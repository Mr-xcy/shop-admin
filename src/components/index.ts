import SvgIcon from "./IconView/SvgIcon.vue";

//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGloablComponents = { SvgIcon }; // 全局组件


// 插件
export default {
  install(app){
    // 全局注册
    Object.keys(allGloablComponents).forEach(key => {
      app.component(key, allGloablComponents[key]);
    });

    //将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}