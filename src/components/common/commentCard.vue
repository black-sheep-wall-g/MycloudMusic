<template>
   <div class="comment" :style="'width:'+width+'px;'">
     <div class="images">
       <img :src="url" alt="">
     </div>
     <div class="content">
       <div class="title">
         <span class="name">{{name}}: </span>
         <span class="title_content">{{content}}</span>
       </div>
       <div class="footer">
         <div>{{temptimeDate}}</div>
         <div>
           <slot name="iconImg"/>
           {{count}} | 无 | 无</div>
       </div>
     </div>
   </div>
</template>

<script>
  export default {
    name: "commentCard",
    data(){
      return{
        temptimeDate:''
      }
    },
    props:{
      width:Number,
      url:String,
      name:String,
      content:String,
      temptime:Number,
      count:Number
    },
    methods:{
      init(){
        this.temptimeDate=new Date(this.temptime).toLocaleString('zh',{hour12:false}).replace(/(.+?)\/(.+?)\/(.+?)\s/,'$1年$2月$3日 ');
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped lang="less">
  .comment{
    border-bottom: 1px solid #464646;
    padding-top: 20px;
    .images{
      display: inline-block;
      overflow: hidden;
      height: 35px;
      width: 35px;
      border-radius: 18px;
      float: left;
      img{
        width: 100%;
      }
    }
    .content{
      display: inline-block;
      margin-left: 10px;
      font-size: 12px;
      .title{
        width: 500px;
        color: white;
        .name{
          color: #85b9e6;
        }
      }
      .footer{
        display: flex;
        justify-content: space-between;
        padding: 7px 0 15px 0;
      }
    }
  }
</style>