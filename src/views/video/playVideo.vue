<template>
  <div class="video_view">
    <div class="video_view_left">
      <div class="play_video">
        <div class="play_video_title">< 视频详情</div>
        <div class="play_video_control">
          <video id="myVideo" class="video-js">
            <source src="http://vodkgeyttp9.vod.126.net/vodkgeyttp8/tWRCiYCn_2360696489_sd.mp4?ts=1618644903&rid=7027483D15A062AE7737668E7CA6C274&rl=3&rs=IWjUREjHnnZyJfknbPPdlWLyJgnVjYJp&sign=f6f64781d0872d82c821b7721862b8ec&ext=8xWS5q31kcq4RAsXCzALJjrRzDFdwX04%2FeQC7tZfCB48kbCZWJfB2mmX7Ow0L2AlD0CRvuNNO0QBVO2lrkqyPIInfNmYhi%2BRUJASqNuDQnLpclD3pWvHDkYOsNEQYv6PvhKMRNDFDbskjk8niBmCW3a7dIIi2VxWZub%2BctRJTd1nNv8GJibXm2cQhphXc7uJMHjEFgRbrneKP9wBzBMzOPeHp93MVg4Z7EZxn0Upr4SiAndRxxkaXq7mXF%2BxSNms" type="video/mp4" />
          </video>
        </div>
      </div>
      <div class="video_owner">
        <div class="owner_detail">
          <span class="owner_pic">
            <img src="http://p2.music.126.net/O0RfViXh42WVp2pBE44eVQ==/109951164221517276.jpg" alt="">
          </span>
          <span class="owner_name">欧美音乐榜</span>
          <span class="owner_btn">+ 关注</span>
        </div>
        <div class="video_title">《THE SOUND OF SLIENCE晋级之声》现场版</div>
        <div class="video_time">
          <span>发布：2017-07-20</span>
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
  import {getVideoUrl} from "../../network/videoView";

  export default {
    name: "playVideo",
    mounted() {
      this.init();
    },
    methods:{
      init() {
        //初始化视频方法
        let myPlayer = this.$video(myVideo, {
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
        this.getVideoUrl(this.$route.params.id);
      },
      getVideoUrl(id){
        getVideoUrl(id).then(res => {
          console.log(res)
        })
      }
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