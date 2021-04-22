<template>
  <div class="video_view">
    <div class="video_view_left">
      <div class="play_video">
        <div class="play_video_title">< 视频详情</div>
        <div class="play_video_control">
          <video id="myVideo" class="video-js vjs-big-play-centered">
            <source :src="videoUrl.url" type="video/mp4" />
          </video>
        </div>
      </div>
      <div class="video_owner">
        <div class="owner_detail">
          <span class="owner_pic">
            <img :src="videoDetail.avatarUrl" alt="">
          </span>
          <span class="owner_name">{{videoDetail ? '' : videoDetail.creator.nickname}}</span>
          <span class="owner_btn">+ 关注</span>
        </div>
        <div class="video_title">{{videoDetail.title}}</div>
        <div class="video_time">
          <span>发布：{{ new Date(videoDetail.publishTime)}}</span>
          <span>播放：146万次</span>
        </div>
        <div class="video_category">
          <span>音乐咨询</span>
        </div>
      </div>
      <div class="video_comment">
        <div class="comment_title"></div>
        <div></div>
      </div>
    </div>
    <div class="video_view_right"></div>
  </div>
</template>

<script>
  import {getVideoDetail, getVideoUrl} from "../../network/videoView";

  export default {
    name: "playVideo",
    data(){
      return{
        //视频地址
        videoUrl:{},
        //视频详情
        videoDetail:{}
      }
    },
    computed:{
      id(){
        return this.$route.params.id;
      }
    },
    methods:{
      init(){
       this.getVideoUrl(this.id);
       this.getVideoDetail(this.id);
      },
      init_video() {
        //初始化视频方法
        let myPlayer = videojs('myVideo', {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          autoplay: "muted",
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",
          //设置视频播放器的显示宽度（以像素为单位）
          width: "620px",
          //设置视频播放器的显示高度（以像素为单位）
          height: "350px"
        });
      },
      //获取视频url
      getVideoUrl(id){
       const _this = this;
        getVideoUrl(id).then(res => {
          if (res.code === 200){
            _this.videoUrl = res.urls[0];
            _this.$nextTick(() => {
              _this.init_video();
            })
          }
        }).catch(res => res);
      },
      //获取视频详情
      getVideoDetail(id){
        getVideoDetail(id).then(res => {
          if (res.code === 200){
            this.videoDetail = res.data;
          }
        }).catch(res => res);
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped lang="less">
  .video_view{
    padding: 0 25px;
    .video_view_left{
      .play_video{
        .play_video_title{
          font-size: 16px;
          padding: 10px 0;
        }
        .play_video_control{}
      }
      .video_owner{
        .owner_detail{
          display: flex;
          align-items: center;
          padding: 15px 0;
          .owner_pic{
            width: 50px;
            height: 50px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 25px;
            }
          }
          .owner_name{
            margin-left: 10px;
          }
          .owner_btn{
            flex: auto;
            text-align: right;
          }
        }
        .video_title{}
        .video_time{}
        .video_category{}
      }
      .video_comment{
        .comment_title{}
      }
    }
    .video_view_right{}
  }
</style>