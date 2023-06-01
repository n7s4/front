<template>
    <div class="pagination">
        <h1>{{ startNumAndendNum}}--当前的页码{{ PageNo }}</h1>
        <!-- 上部分 -->
      <button>上一页</button>
      <button v-if="startNumAndendNum.start > 1">1</button>
      <button v-if="startNumAndendNum.start > 2">···</button>
  
      <!-- 中间部分 -->
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      <!-- 下部分 -->
      <button>···</button>
      <button>{{ totalPage }}</button>
      <button>下一页</button>
      
      <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
  </template>
  
  <script>

    export default {
      name: "Pagination",
      props:['PageNo','PageSize','total','continues'],
      computed:{
        //总共多少页
        totalPage(){
            return Math.ceil(this.total/this.PageSize);
        },
        //计算出连续的页码的起始数字与结束数字
        startNumAndendNum(){
            //算出连续页码:开始与结束这两个数字
      let start = 0,
        end = 0;
      const { totalPage, pagerCount, pageNo } = this;
      //特殊情况:总共页数小于连续页码数
      if (totalPage < pagerCount) {
        start = 1;
        end = totalPage;
      } else {
        //正常情况：分页器总页数大于连续页码数
        start = pageNo - parseInt(pagerCount / 2);
        end = pageNo + parseInt(pagerCount / 2);
        //约束start|end在合理范围之内
        //约束头部
        if (start < 1) {
          start = 1;
          end = pagerCount;
        }
        //约束尾部
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - pagerCount + 1;
        }
      }
            return {start,end};
        }
      }
    }
  </script>
  
  <style lang="less" scoped>
    .pagination {
        text-align: center;
      button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;
  
        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }
  
        &.active {
          cursor: not-allowed;
          background-color: #409eff;
          color: #fff;
        }
      }
    }
  </style>
  