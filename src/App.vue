
<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- 在home Search下Footer是显示的，在Login和Register下不显示 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //派发action
    this.$store.dispatch("reqCategoryList");
  },
};
</script>

<style>
</style>
