<template>
  <div class="video_card" v-for="(item,index) in videoList" :key="index">
    <div class="card_img">
      <img :src="hoverIndex === index ? item.data.previewUrl : item.data.coverUrl" alt="" @mouseenter="hoverIndex = index" @mouseleave="hoverIndex = -1" @click="toPlayVideo(item.data.vid)">
      <span class="card_count">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yousanjiao"></use>
              </svg>
              {{item.data.playTime >= 100000 ? Math.round(item.data.playTime / 10000) + '万' : item.data.playTime}}
            </span>
      <span class="card_time">
              {{(Math.floor((item.data.durationms % 3600000) / 60000) < 10 ? ('0' + Math.floor((item.data.durationms % 3600000) / 60000)) : Math.floor((item.data.durationms % 3600000) / 60000)) + ':' + (Math.floor((item.data.durationms % 60000) / 1000) < 10 ? ('0' + Math.floor((item.data.durationms % 60000) / 1000)) : Math.floor((item.data.durationms % 60000) / 1000))}}
            </span>
    </div>
    <div class="card_name" :title="item.data.title">{{item.data.title}}</div>
    <div class="card_by" :title="item.data.creator.nickname">by {{item.data.creator.nickname}}</div>
  </div>
</template>

<script>
  export default {
    name: "videoCard",
    data(){
      return{

      }
    },
    props:{

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