<template>
  <div>
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>x
          </ul>
          <ul class="fl sui-tag">
            <!-- 删除categoryName -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removecategoryName">×</i>
            </li>
            <!-- 删除keyWord -->
            <li class="with-x" v-if="searchParams.keyWord">
              {{ searchParams.keyWord }}
              <i @click="removekeyWord">×</i>
            </li>
            <!-- 品牌 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(",")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!--  平台售卖的属性值展示-->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a >
                    综合
                    <span class="iconfont" v-show="isOne" :class="{'icon-UP':isAsc,'icon-DOWN':isDesc}"></span>
                  </a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a >
                    价格
                    <span class="iconfont" v-show="isTwo" :class="{'icon-UP':isAsc,'icon-DOWN':isDesc}"></span>
                  </a>
                </li>
                <!-- <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li> -->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a :title="goods.title">{{ goods.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>{{ goods.id }}</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters,mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyWord: "",
        order: "1:asc",
        pageNo: 1,
        pageSize: 3,
        trademark: "",
      },
    };
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  components: {
    SearchSelector,
  },
  computed: {
    ...mapState({
      total : state=>state.search.searchList.total
    }),
    ...mapGetters(["goodsList"]),
    isOne(){
      return this.searchParams.order.indexOf("1") != -1
    },
    isTwo(){
      return this.searchParams.order.indexOf("2") != -1
    },
    isAsc(){
      return this.searchParams.order.indexOf('asc')!= -1
    },
    isDesc(){
      return this.searchParams.order.indexOf('desc')!= -1
    },
  },
  methods: {
    //把这次请求封装成一个函数
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    removecategoryName() {
      this.searchParams.categoryName = "";
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      this.getData();
      //地址栏也需要改动，进行路由跳转（自己跳自己）
      //严谨：本意是删除query，如果路径当中由params参数，则应该将其带过去
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    removekeyWord() {
      this.searchParams.keyWord = undefined;
      // this.getData();
      //通知兄弟组件Header清楚关键字
      this.$bus.$emit("clear");
      //进行路由的跳转
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    removeTrademark() {
      this.searchParams.trademark = "";
      this.getData();
    },
    trademarkInfo(trademarkList) {
      //整理品牌信息的参数
      this.searchParams.trademark = `${trademarkList.tmId},${trademarkList.tmName}`;
      // console.log(this.searchParams.trademark);
      this.getData();
    },
    attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if(this.searchParams.props.indexOf(props) === -1){
        this.searchParams.props.push(props);
      }
     
      // console.log(this.searchParams.props);
      this.getData();
    },
    removeAttr(index){
      this.searchParams.props.splice(index,1);
      this.getData();
    },
    //处理排序
    changeOrder(flag){
      //这里获取到的是最原始的状态
      let originFlag = this.searchParams.order.split(":")[0];
      let originOrder = this.searchParams.order.split(":")[1];
      //准备一个新的Order值
      let newOrder = "";
      //点击的是综合
      if(flag == originFlag){
          newOrder = `${originFlag}:${originOrder=='desc'?"asc":"desc"}`;
      }else{
        //点击的是价格
        newOrder = `${flag}:${'desc'}`;
      }
      //将新的order赋值非order
      this.searchParams.order = newOrder;
      //再次发请求
      this.getData();
    },
    //自定义事件的回调函数---获取当前是第几页
    getPageNo(pageNo){
      //整齐带给服务器的参数
      this.searchParams.pageNo = pageNo;
      //再次发请求
      this.getData();
    },
  },
  watch: {
    //监听路由的信息是否发声变化
    $route(newValue, oldValue) {
      //再次发请求之前整理带给服务器参数
      Object.assign(
        this.$route.searchParams,
        this.$route.query,
        this.$route.params
      );
      //再次发起Ajax请求
      this.getData();
      //每一次请求完毕，应该把响应的1、2、3级分类的id重置
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>


<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>