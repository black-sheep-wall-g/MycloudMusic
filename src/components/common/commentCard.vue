<template>
   <div class="comment">
     <div class="images">
       <img :src="url" alt="">
     </div>
     <div class="content">
       <div class="title">
         <span>{{name}}:</span>
         <span>{{content}}</span>
       </div>
       <div class="footer">
         <div>2018年11月13日 12:10</div>
         <div>166000 | 无 | 无</div>
       </div>
     </div>
   </div>
</template>

<script>
  export default {
    name: "commentCard",
    data(){
      return{

      }
    },
    props:{
      url:String,
      name:String,
      content:String,
      temptime:Number,
      thumbsNum:Number
    }
  }
</script>

<style scoped lang="less">
  .comment{
    display: flex;
    border-bottom: 1px solid #464646;
    .images{
      overflow: hidden;
      height: 35px;
      width: 35px;
      border-radius: 18px;
      img{
        width: 100%;
      }
    }
    .content{
      .title{}
      .footer{
        display: flex;
      }
    }
  }
</style>