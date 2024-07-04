// 创建用户 相关仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import type { loginFormData, loginResponseData, userInfoReponseData } from "@/api/user/type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";

//引入路由(常量路由)
import { constantRoutes, asnycRoute, anyRoute } from '@/router/routes'

//引入深拷贝方法
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'

//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

let useUserStore = defineStore('User', {
  // 仓库存储数据的地方
  state: () => {
    return {
      token: GET_TOKEN() || '',// 用户token
      menuRoutes: constantRoutes, //仓库存储生成菜单需要数组(路由)
      userInfo: {},
      username: '',
      avatar: '',
      //存储当前用户是否包含某一个按钮
      buttons: [],
    }
  },
  // 异步处理
  actions: {
    // 用户登录
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data);
      if (result.code == 200) {
        // 本地存储token 持久化
        SET_TOKEN(result.data.token);
        return 'ok';
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    // 获取用户信息
    async userInfo() {
      const result: userInfoReponseData = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
        this.buttons = result.data.checkUser.buttons

        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asnycRoute),
          result.data.checkUser.routes,
        )

        //菜单需要的数据整理完毕
        // this.menuRoutes = [...constantRoutes, ...asnycRoute, anyRoute]
          //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
          // ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          //   router.addRoute(route)
          // })

        return 'ok';
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    //退出登录
    async userLogout() {
      //退出登录请求
      const result: any = await reqLogout()
      if (result.code == 200) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  // 处理数据
  getters: {}
});

export default useUserStore;