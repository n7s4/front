<template>
    <div class="pagination">
       
        <!-- 上部分 -->
      <button>上一页</button>
      <button v-if="startNumAndendNum.start  :disab> 1">1</button>
      <button v-if="startNumAndendNum.start > 2">···</button>
  
      <!-- 中间部分 -->
      <button v-for="(page,index) in startNumAndendNum.end" :key="index" v-show="page>=startNumAndendNum.start">{{ page }}</button>

      <!-- 下部分 -->
      <button v-if="startNumAndendNum.end<totalPage-1">···</button>
      <button v-if="startNumAndendNum">{{ totalPage }}</button>
      <button>下一页</button>
      
      <button style="margin-left: 30px">共 {{total}} 条</button>
      <h1>{{ startNumAndendNum}}</h1>
    </div>
  </template>
  
  <script>

    export default {
      name: "Pagination",
      props:['pageNo','pageSize','total','continues'],
      computed:{
        //总共多少页
        totalPage(){
            return Math.ceil(this.total/this.pageSize);
        },
        //计算出连续的页码的起始数字与结束数字
        startNumAndendNum(){
            const {continues,pageNo,totalPage} = this;
            //先定义两个变量把起始页和结束存储起来
            let start = 0,
                end = 0;
            //页码数小于连续页码
            if(continues > totalPage){
                start = 1;
                end = totalPage;
            }else{
                start = pageNo - parseInt(continues / 2);
                end = pageNo + parseInt(continues / 2);
            }
            //如果起始页小于1
            if(start<1){
                start = 1;
                end = continues;
            }
            //如果结束页大于总页数
            if(end>totalPage){
                end = totalPage;
                start = totalPage - continues + 1;
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
  