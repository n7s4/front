<template>
  <div>
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <p v-if="!userName">
              <span>请</span>
              <!-- 声明式路由 -->
              <router-link to="/login">登录</router-link>
              <router-link to="/register" class="register">免费注册</router-link>
            </p>
            <p v-else>
              <a>{{ userName }}</a>
              <a class="register" @click="logOut">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center/myorder">我的购物车</router-link>
            <router-link to="">我的购物车</router-link>
            <router-link to="">我的订单</router-link>
            <router-link to="">我的尚品汇</router-link>
            <router-link to="">尚品汇会员</router-link>
            <router-link to="">企业采购</router-link>
            <router-link to="">关注尚品汇</router-link>
            <router-link to="">合作招商</router-link>
            <router-link to="">商家后台</router-link>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" to="/home">
            <img src="./images/logo.png" alt />
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyWord"
            />
            <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch()">搜索</button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      keyWord: "",
    }
  },
  computed:{
    //用户名信息
    userName(){
      return this.$store.state.user.userInfo.loginName;
    }
  },
  methods: {
    //编程式路由
    goSearch() {
      //代表的是如果有query参数也带过去
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyWord: this.keyWord || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }

      /******************************************* ***********************/
      //如何指定params参数可传可不传？
      //如果路由要求传递params参数，但是你就是不穿，url就会有问题，但是页面还是可以进行跳转
      //如何制定params参数可以传递、或者不能传递，在配置路由的时候，在占位的后面加上一个问好【params可以传递或者不可以传递】
    },
    //退出登录
    async logOut(){
      try {
        await this.$store.dispatch('userLogout');
        this.$router.push('/home');
      } catch (error) {
        console.log(error.message);  
      }
    }
  },
  mounted(){
    this.$bus.$on('clear',()=>{
      this.keyWord = '';
    });
  }
};
</script>

<style lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>