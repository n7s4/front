<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaceIndex"  @click="goSearch">
        <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId">
                <h3 @mouseenter="changIndex(index)" :class="{cur:currentIndex == index}">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{display:currentIndex==index?'block':'none'}"
                >
                  <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2id="c2.categoryId"
                        >{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3id="c3.categoryId"
                          >{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  mounted() {
    //如果不是home路由组件则讲TypeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  methods: {
    changIndex: throttle(function (index) {
      //节流
      this.currentIndex = index;
    }, 50),
    leaceIndex() {
      this.currentIndex = -1;
      // 判断如果是search路由组件才会执行
      if (this.$route.path == "/home") {
        this.show = false;
      }
    },
    goSearch(event) {
      let element = event.target;
      let {
        categoryname,
        category1id,
        category2id,
        category3id,
      } = element.dataset;
      if (categoryname) {
        //判断是否是a标签
        let location = { name: "search" };
        let query = { categoryName: categoryname};
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;        
        }
        //判断路由跳转的时候，带有params参数，捎带传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          //整理完参数
          location.query = query;
          //路由跳转
          this.$router.push(location);
        }
      }
    },
    //全部商品分类鼠标进入
    changeShow() {
      //鼠标进入:在search路由下,在修改数据
      if (this.$route.path != "/home") {
        this.show = true;
      }
    }
    //当鼠标进入的时候展示商品信息
    // changeShow() {
    //   if (this.$route.path == "/search") {
    //     this.show = true;
    //     console.log(666);
    //   }
    // },
  },

  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
    //过渡动画的样式
    //进入的状态
    .sort-enter {
      height: 0px;
    }
    //结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    //定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
  .cur {
    background-color: skyblue;
  }
}
</style>