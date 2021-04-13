<template>
  <div class="video_all" @scroll="scrollEvent">
    <div class="video_title">
      <span :class="titleIndex === index ? 'titleActive' : ''" v-for="(item,index) in videoTitleList" :key="index" @click="changeTitle(index)">{{item}}</span>
    </div>
    <div class="video_content">
      <div class="video_top">
        <span @click="categoryModal = !categoryModal">{{labelChange}}</span>
        <Modal v-model="categoryModal" width="600" :scrollable="true" :closable="false" :footer-hide="true" :styles="{'top': '160px','height':'400px','overflow-y':'scroll'}">
          <div style="padding: 5px 10px;border-bottom: 1px solid #444;" @click="changeLabel('all')">全部视频</div>
          <span class="video_label" :class="item.id === categoryID ? 'categoryActive' : ''" v-for="(item,index) in groupList" :key="index" @click="changeLabel(item)">{{item.name}}</span>
        </Modal>
        <div class="video_right">
          <span class="video_category" :class="item.id === categoryID ? 'categoryActive' : ''" v-for="(item,index) in categoryList" :key="index" @click="toCategory(item)">{{item.name}}</span>
        </div>
      </div>
      <div class="video_btm">
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
      </div >
    </div>
  </div>
</template>

<script>
  import {getVideoAll, getVideoCategoryList, getVideoGroup, getVideoGroupList} from "../../network/videoView";

  export default {
    name: "videoView",
    data(){
      return{
        //视频分类列表
        categoryList:[],
        //视频分类id
        categoryID:-1,
        //当前视频页数
        offsetPage:0,
        //标签选择框
        categoryModal:false,
        //标签分类列表
        groupList:[],
        //标签
        labelChange:'全部视频',
        //视频list
        videoList:[],
        //scroll滚动定时器
        scrollTimer:null,
        //titlelist
        videoTitleList:['视频','MV'],
        //titleIndex
        titleIndex:0,
        //悬停播放
        hoverIndex:-1
      }
    },
    watch:{
      categoryID(newVal){
        this.offsetPage = 0;
        this.videoList = [];
        this.getVideoGroup(newVal);
      }
    },
    methods:{
      init(){
        this.getVideoDetail();
        this.getVideoAll();
      },
      getVideoDetail(){
        //获取视频分类列表
        getVideoCategoryList().then(res => {
          if (res.code === 200){
            this.categoryList = res.data;
          }
        })
        //获取视频标签列表
        getVideoGroupList().then(res => {
          if (res.code === 200){
            this.groupList = res.data;
          }
        })
      },
      toCategory(e){
        this.categoryID = e.id;
        this.labelChange = e.name;
      },
      //切换label
      changeLabel(e){
        if (e === 'all'){
          this.categoryModal = false;
          this.labelChange = '全部视频';
          this.getVideoAll();
        }else{
          this.categoryID = e.id;
          this.categoryModal = false;
          this.labelChange = e.name;
        }
      },
      //获取全部视频
      getVideoAll(offset){
        getVideoAll(offset).then(res => {
          if (res.code === 200){
            this.videoList.push(...res.datas)
          }
        })
      },
      //获取视频标签/分类下的视频
      getVideoGroup(id,offset){
        getVideoGroup(id,offset).then(res => {
          if (res.code === 200){
            this.videoList.push(...res.datas)
          }
          console.log(JSON.parse(JSON.stringify(res)))
        })
      },
      scrollEvent(e){
        if(e.srcElement.scrollTop+e.srcElement.offsetHeight>e.srcElement.scrollHeight-50){
          clearTimeout(this.scrollTimer);  // 每次触发时先清除上一次的定时器,然后重新计时
          this.scrollTimer = setTimeout(()=>{
            this.offsetPage++;
            if (this.labelChange === '全部视频'){
              this.getVideoAll(this.offsetPage);
            }else {
              this.getVideoGroup(this.categoryID,this.offsetPage);
            }
          }, 500);  // 指定 xx ms 后触发真正想进行的操作 handler
        }
      },
      //改变标题
      changeTitle(i){
        this.titleIndex = i;
      },
      //跳转播放页面
      toPlayVideo(id){
        console.log(id)
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped lang="less">
  .categoryActive{
    background-color: #3d2c2c;
    color: #e14141;
  }
  .titleActive{
    border-bottom: 1px solid #e14141;
  }
  /deep/ .ivu-modal-mask{
    background-color: unset;
  }
  /deep/.ivu-modal-wrap{
    .ivu-modal-content{
      background-color: #363636;
    }
    .video_label{
      display: inline-block;
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 15px;
      margin: 10px 0;
      &:hover{
        background-color: #3f3f3f;
        color: #ec4141;
      }
    }
  }


.video_all{
  width: 820px;
  padding: 20px 30px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  .video_title{
    span{
      display: inline-block;
      font-size: 16px;
      margin: 0 30px 20px 0;
    }
  }
  .video_content{
    .video_top{
      >span{
        display: inline-block;
        border-radius: 16px;
        border: 1px solid #444;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
      .video_right{
        display: inline-block;
        float: right;
        >span{
          padding: 3px 10px;
          border-radius: 12px;
        }
        .video_category{

        }
      }
    }
    .video_btm{
      margin-top: 20px;
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
    }
  }
}
</style>