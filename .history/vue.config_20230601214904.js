const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  
  
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
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/项目名称/'
    : '/'
})
