const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  transpileDependencies: true,
  productionSourceMap: false,
  lintOnSave: false,
  pathRewrite: {
    '^api':'http://gmall-h5-api.atguigu.cn'	//填写需要跨域的地址
 },
  devServer: {
    proxy: {
      "/api": {
        target: " http://gmall-h5-api.atguigu.cn",
        ["/api/"]: "",
      },
    },
  },
});
