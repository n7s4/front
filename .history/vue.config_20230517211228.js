const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  baseUrl:process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir:process.env.outputDir,
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{
        target:' http://gmall-h5-api.atguigu.cn',
        ['/api/']:''
      }
    }
  }
})
