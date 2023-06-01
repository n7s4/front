const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  base: '/vue2-',

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
  
})
