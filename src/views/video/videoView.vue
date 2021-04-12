<template>
  <div class="video_all">
    <div class="video_title">
      <span>视频</span>
      <span>MV</span>
    </div>
    <div class="video_content">
      <div class="video_top">
        <span>全部视频</span>
        <div class="video_right">
          <span></span>
        </div>
      </div>
      <div class="video_btm"></div>
    </div>
  </div>
</template>

<script>
  import {getVideoCategoryList} from "../../network/videoView";

  export default {
    name: "videoView",
    data(){
      return{

      }
    },
    methods:{
      init(){
        this.getVideoCategoryList();
      },
      getVideoCategoryList(){
        getVideoCategoryList().then(res => {
          console.log(res)
        })
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>

</style>