<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不许压迫再引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>

    <Brand></Brand>
  </div>
</template>
  
  <script>
//引入其他组件
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import { mapState } from "vuex";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  mounted() {
    this.$store.dispatch("getFloorList");

    // this.$store.dispatch('getUserInfo');
  },
};
</script>
  
  <style>
</style>