const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  baseUrl:process.env.
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
