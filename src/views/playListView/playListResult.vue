<template>
  <div class="play_list_content">
    <div class="play_list_header">
      <img class="list_pic" src="https://p1.music.126.net/71Bsx5UhPmPF6Rexs5oGsg==/109951165452810392.jpg" alt="">
      <div class="play_list_right">
        <div class="play_list_title">
          <span class="play_list_title_left">歌单</span>
          <span class="play_list_title_right">我喜欢的音乐</span>
        </div>
        <div class="play_list_user">
          <img class="play_list_user_pic" src="http://p1.music.126.net/O0RfViXh42WVp2pBE44eVQ==/109951164221517276.jpg" alt="">
          <span class="play_list_user_name">轻吟浅唱子沉醉</span>
          <span>2016-12-21创建</span>
        </div>
        <div class="play_list_btn">
          <div class="all_play">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang1"></use>
            </svg>
            <div class="play_text">播放全部</div>
            <div class="collectRecom">
              <svg class="icon collectImg" aria-hidden="true">
                <use xlink:href="#icon-jia"></use>
              </svg>
            </div>
          </div>
          <Button shape="circle" size="16px">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shoucangjia"></use>
            </svg>
            收藏(0)
          </Button>
          <Button shape="circle" size="16px">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenxiang1"></use>
            </svg>
            分享(0)
          </Button>
          <Button shape="circle" size="16px">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tubiaozhizuomoban"></use>
            </svg>
            下载全部
          </Button>
        </div>
        <div>
          <div>歌曲:<span>246</span></div>
          <div>播放:<span>2447</span></div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
  import {getListDetail} from "../../network/home";

  export default {
    name: "playListResult",
    data(){
      return{

      }
    },
    computed:{
      //歌单id
      id(){
        return this.$route.query.id;
      }
    },
    watch:{
      id(newVal){
        this.getListDetail(newVal);
      }
    },
    methods:{
      getListDetail(id){
        getListDetail(id).then(res => {
          console.log(res)
        })
      }
    },
    created() {
      this.getListDetail(this.id);
    }
  }
</script>

<style scoped lang="less">
  .play_list_content{
    .play_list_header{
      display: flex;
      padding-top: 30px;
      padding-left: 30px;
      .list_pic{
        width: 185px;
        height: 185px;
        border-radius: 5px;
      }
      .play_list_right{
        padding-left: 20px;
        .play_list_title{
          .play_list_title_left{
            padding: 1px 4px;
            border: 1px solid #ec4141;
            color: #ec4141;
            border-radius: 3px;
            margin-right: 10px;
          }
          .play_list_title_right{
            color: #d0d0d0;
            font-size: 20px;
            font-weight: 600;
          }
        }
        .play_list_user{
          display: flex;
          font-size: 12px;
          margin: 10px 0;
          height: 22px;
          line-height: 22px;
          .play_list_user_pic{
            width: 22px;
            height: 22px;
            border-radius: 11px;
          }
          .play_list_user_name{
            color: #85b9e6;
            margin: 0 5px;
          }
        }
        .play_list_btn{
          .all_play {
            position: relative;
            width: 140px;
            height: 35px;
            line-height: 35px;
            border-radius: 18px;
            background-color: #ec4141;
            cursor: pointer;

            svg {
              font-size: 13px;
              color: snow;
              position: absolute;
              top: 10px;
              left: 15px;
            }

            .play_text {
              margin-left: 25px;
              text-align: center;
              font-size: 13px;
              color: snow;
              width: 80px;
              border-right: 1px solid #e65555;
            }

            .collectRecom {
              display: inline-block;

              .collectImg {
                font-size: 17px;
                top: 6px;
                left: 114px;
              }
            }
          }
        }
      }
    }
  }
</style>