<template>
   <div>
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

<style scoped>

</style>