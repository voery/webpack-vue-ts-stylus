# webpack-vue-ts-stylus
  1. npm init <br/>
    创建packkage.json
  2. npm i --save-dev webpack webpack-cli ...<br/>
    安装必要的插件
  3. 配置webpack---webpack.config.js
      -  添加必要的loader包
          > cnpm i --save-dev babel-core babel-eslint css-loader file-loader postcss-loader px2rem px2rem-loader stylus stylus-loader less less-loader sass sass-loader typescript ts-loader url-loader vue-loader vue-style-loader
      -  安装插件
          ***
              cnpm i --save-dev mini-css-extract-plugin html-webpack-plugin

              由于webpack安装的4.x.x，这里的css插件官方推荐安装mini-css-extract-plugin
              如果是3.x.x这里推荐安装extract-text-webpack-plugin
          ***
      -  配置loader和plugins

    4. 由于使用了typescript这里需要配置tsconfig.json
        ```javascript
            {
              // compilerOptions可以不用配置使用默认配置，这里我们需要配置下
              "compilerOptions": {
                // 是否编译js文件  默认为false
                "allowJs": true,
                // 是否允许从没有设置默认导出的模块中默认导入。
                /*
                * 默认为
                * module === "system" 或设置了 --esModuleInterop 且 module 不为 es2015 / esnext
                */
                "allowSyntheticDefaultImports": true,
                // 解析非相对模块名的基准目录。 与paths配合使用
                "baseUrl": ".",
                //  是否启用实验性的ES装饰器。 默认为false
                "experimentalDecorators": true,
                // 发出”“importstar”“和”“importdefault”“帮助程序以实现运行时babel生态系统兼容性，并启用”“-allowsyntheticdefaultimports”“以实现类型系统兼容性。 默认为false
                "esModuleInterop": true,
                // 在 .tsx文件里支持JSX： "React"或 "Preserve" 默认为preserve
                "jsx": "preserve",
                // 编译过程中需要引入的库文件的列表。 
                /**
                 * 默认注入的库为：
                    针对于--target ES5：DOM，ES5，ScriptHost 
                    针对于--target ES6：DOM，ES6，DOM.Iterable，ScriptHost
                */
                "lib": [
                  "esnext",
                  "dom",
                  "dom.iterable",
                  "scripthost"
                ]
                // 指定生成哪个模块系统代码： "None"， "CommonJS"， "AMD"， "System"， "UMD"， "ES6"或 "ES2015"。默认值： target === "ES6" ? "ES6" : "commonjs"
                "module": "esNext",
                // 决定如何处理模块。默认值： module === "AMD" or "System" or "ES6" ? "Classic" : "Node"
                "moduleResolution": "node",
                // 是否在表达式和声明上有隐含的 any类型时报错。 默认为false
                "noImplicitAny": false,
                // 重定向输出目录。
                "outDir": "./dist/",
                // 模块名到基于 baseUrl的路径映射的列表。
                "paths": {
                  // 引入模块中有@前缀时从以下数组路径查找
                  "@/*": [
                    //  src/*文件
                    "src/"
                  ]
                },
                // 是否生成相应的 .map文件。默认为false
                "sourceMap": true,
                // 是否启用所有严格类型检查选项。 默认为false
                "strict": true,
                // 阻止对对象字面量的额外属性检查。 默认为false
                "suppressExcessPropertyErrors": true,
                // 指定ECMAScript目标版本  默认为es3
                "target": "es5",
              },
              // 是否让IDE在保存文件的时候根据tsconfig.json重新生成文件。
              "compileOnSave": true,
              // "include"和"exclude"属性指定一个文件glob匹配模式列表。
              // 包含的文件
              "include": [
                "src/**/*.ts",
                "src/**/*.tsx",
                "src/**/*.vue",
                "test/**/*.ts",
                "test/**/*.tsx",
                "test/**/*.vue"
              ],
              // 不包含的文件
              "exclude": [
                "node_modules"
              ]
            }
        ```
    5. 配置postcss.config.js 或 .postcssrc(以JSON或YAML格式创建文件)
        ```javascript
            /**
             * postcss.config.js
            */
            // 此配置可以直接在webpack.config.js中配置
            module.exports = {
              "plugins": {
                // 此插件可以使用本地文件、节点模块或Web_modules。
                "postcss-import":{},
                // postss插件，用于在url（）上重新设置、内联或复制。
                "postcss-url": {},
                // Autoprefixer是一个后处理程序，你可以同Sass，Stylus或LESS等预处理器共通使用。
                "autoprefixer": {}
              }
            }
            /**
             * .postcssrc.js
            */
           module.exports = (ctx) => ({
             // 自定义PostCSS解析器
             parser: ctx.parser ? 'sugarss' : false,
             // 启用/禁用源映射
             map: ctx.env === 'development' ? ctx.map : false,
             plugins: {
               "postcss-import":{},
                "postcss-url": {},
                "autoprefixer": {}
             }
           })
            /**
             *#webpack.config.js
            */
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')({}),
                  require('postcss-url')({}),
                  require('postcss-import')({})
                ]
              }
            }
        ```
    6.  配置.babelrc
        ```js
            {
              // 设定转码规则
              "presets": [
                // 需要安装babel-preset-env
                /**
                 * 它可以根据开发者的配置，按需加载插件。
                 **/
                [
                  "env",
                  {
                    // 启用将ES6模块语法转换为其他模块类型。将此设置为false不会转换模块。
                    "modules": false,
                    "targets": {
                      // 针对浏览器的匹配
                      "browsers": [
                        "> 1%",
                        "last 2 versions",
                        "not ie <= 8"
                      ]
                    }
                  }
                ],
                // 需要安装babel-preset-stage-2
                /*
                *  这个是babel第二阶段的插件
                */
                "stage-2"
              ],
              "plugins": [
                // 需要安装babel-plugin-transform-vue-jsx
                /**
                 * 适用于Vue 2.0 JSX的Babel插件
                */
                "transform-vue-jsx",
                // 需要安装babel-plugin-transform-runtime
                /**
                 * 在转换 ES2015 语法为 ECMAScript 5 的语法时，babel 会需要一些辅助函数.babel 默认会将这些辅助函数内联到每一个 js 文件里，这样文件多的时候，项目就会很大。所以 babel 提供了 transform-runtime 来将这些辅助函数“搬”到一个单独的模块 babel-runtime 中，这样做能减小项目文件的大小。
                */
                "transform-runtime"
              ]
            }
        ```

    7. 安装vue vuex vue-router 及 vue-class-component vue-property-decorator
        ```
            cnpm i --save vue vue-router vuex vue-class-component vue-property-decorator
            vue-class-component 以class模式写vue
            vue-property-decorator是vue-class-component的扩展依赖于它
        ```
    8. 配置shims-vue.d.ts 和 shims-txs.d.ts 文件， 主要用于 TypeScript 识别.vue 文件和txs文件
        ```js
            /**
             * shims-vue.d.ts
              * 这个文件只做.vue的配置
            */
            declare module '*.vue' {
              import Vue from 'vue'
              export default Vue
            }
            /**
             * shims-txs.d.ts  如果不使用txs的可以不用配置
             * 这里是对txs文件的全局配置
            */
            import Vue, {VNode} from 'vue'
            declare global {
              namespace: JSX {
                interface Element extends VNode {}
                interface ElementClass extends Vue {}
                interface IntrinsicElements {
                  [elem: string]: any
                }
              }
            }
        ```
    9. 编辑入口文件index.ts
        ```js
        import Vue from 'vue'
        import App from './App.vue'
        declare module 'vue/types/vue' {
          interface Vue {
            // 这里可以定义通过Vue.prototype指定的方法和属性的类型
            $getApi: any,
            $axios: any    
          }
        }

        new Vue({
          render: h => h(App)
        }).$mount('#app')
        ```