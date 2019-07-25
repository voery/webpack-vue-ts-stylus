import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * 1. 我们设定路由引入的文件都取至 @/views下的index.vue文件
 * 2. 将所有文件夹下的index.vue文件路径取出
 * 3. 遍历查到的路径匹配是否为一级路由的路径， 默认@/views下的第一级文件夹下的index.vue为一级路由
 * 4. 利用递归遍历添加更深层次的路由
 */
function getRouters (): Array<any> {
  // 获取所有要引入的路由文件
  /**
   * 这里调用require.context需要安装@types/webpack-env 和 @types/node
   * '@/views' 指定的需要查找文件的根目录
   * true 是有深度遍历查找
   * /\/index\.vue$/ 是匹配查找文件
   * 'lazy' 是查找的方式 可选值 weak eager lazy-once sync lazy
   */
  const contexts = require.context("@/views", true, /\/index\.vue$/, "lazy")
  const routers: Array<any> = []
  const route: Array<any> = []
  // 获取所有匹配的文件
  contexts.keys().forEach(item => {
    const matchArr = /\/([\s\S]+)?\/index\.vue/g.exec(item)
    if(!matchArr || !matchArr.length) return
    routers.push(matchArr[1])
  })
  console.log('routers', routers)
  function matchRoute (routers: any, index = 1){
    routers = routers.filter((item: any) => {
      const matchArr = item.split("/");
      if (matchArr.length == index) {
        if (index == 1) {
          route.push({
            path: "/" + item,
            name: item
              .trim()
              .replace(/^[a-zA-Z]/g, (v: String) => v.toUpperCase()),
            component: () =>
              // 这个import动态导入需要在tsconfig.json中的module的值为esnext或commonjs是才有效
              import(`@/views/${item}/`),
            children: []
          });
        } else {
          route.map(map => {
            mapChild(item, map);
          });
        }
        return null;
      }
      return item
    })
    
    if(routers.length > 0){
      index++
      matchRoute(routers, index)
    }
  }
  function mapChild (item: any, map: any) {
    if (
      item.indexOf(map.path.slice(1)) > -1 &&
      item.split('/').length == map.path.split("/").length
    ) {
      map.children.push({
        path: "/" + item,
        name: item
          .slice(item.lastIndexOf("/") + 1)
          .trim()
          .replace(/^[a-zA-Z]/g, (v: String) => v.toUpperCase()),
        component: () =>
          // 这个import动态导入需要在tsconfig.json中的module的值为esnext或commonjs是才有效
          import(`@/views/${item}/`),
        children: []
      });
    } else {
      map.children.map((map1: any) => {
        mapChild(item, map1)
      })
    }
  }
  matchRoute(routers)
  
  return route
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'// 默认进入的首页
    },
    ...getRouters()
  ]
})
