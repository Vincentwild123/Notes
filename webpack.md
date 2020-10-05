# webpack
1. webpack是一个js应用程序静态模块打包器，递归构建依赖关系图(dependency graph),包含应用程序需要的每个模块，再将所有这些模块打包成bundle
---
2. 核心概念
 1. 入口(entry)作为构建依赖图的开始，可以有多个入口 
 2. 输出(output)指定bundle(一捆模块)输出到哪
 3. loader 将所有文件转换为依赖图可以引用的模块，为不同文件配置相应的loader（test：use）
 4. 插件(plugins) 插件接口，require()引入，添加到plugins数组
 5. 模式(mode)区分线上环境还是开发环境
---
3. 详解
 1. 入口(entry)详解
  设置方式：string/Array/Object
  为不同的依赖图设置不同的入口文件
 2. 输出(output)详解
  设置方式：object{filename，path}
 3. loader
  为不同的类型文件指定loader，设置rules数组
  设置方式：配置webpack.config.js /内联在每个import语句中指定loader/CLI 在命令行指定loader
  配置webpack.config.js可以指定多个loader
 4. 插件(plugins)
  
   