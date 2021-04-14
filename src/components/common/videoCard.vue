<template>
  <div class="video_card">
    <div class="card_img" @click="$emit('toVideoView')">
      <img :src="imgFlag ? dynImg : staticImg" alt="" @mouseenter="imgFlag = true" @mouseleave="imgFlag = false">
      <span class="card_count">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yousanjiao"></use>
        </svg>
        {{count >= 100000 ? Math.round(count / 10000) + '万' : count}}
      </span>
      <span class="card_time">
        {{this.times}}
      </span>
    </div>
    <div class="card_name" :title="title">{{title}}</div>
    <div class="card_by" :title="name">by {{name}}</div>
  </div>
</template>

<script>
  export default {
    name: "videoCard",
    data(){
      return{
        imgFlag:false
      }
    },
    computed:{
      times(){
        const m = Math.floor((this.time % 3600000) / 60000);
        const s = Math.floor((this.time % 60000) / 1000);
        return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
      }
    },
    props:{
      //动态图片
      dynImg:String,
      //静态图片
      staticImg:String,
      //次数
      count:Number,
      //时间
      time:Number,
      title:String,
      name:String
    }
  }
</script>

<style scoped lang="less">
  .video_card{
    width: 240px;
    height: 180px;
    display: inline-block;
    margin-right: 20px;
    color: white;
    font-size: 12px;
    margin-bottom: 20px;
  &:nth-child(3n){
     margin-right: unset;
   }
  .card_img{
    position: relative;
    width: 240px;
    height: 135px;
    margin-bottom: 10px;
  img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
  }
  .card_count{
    position: absolute;
    top: 2px;
    right: 5px;
  }
  .card_time{
    position: absolute;
    bottom: 0;
    right: 5px;
  }
  }
  .card_name{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .card_by{
    color: #666666;
  }
  }

</style>