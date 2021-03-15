<template>
  <div class="home_list">
    <div class="home_list_head">
      推荐歌单
      <svg class="icon" aria-hidden="true" font-size="20px">
        <use xlink:href="#icon-arrow-l"></use>
      </svg>
    </div>
    <div class="home_list_body">
      <card :padding="0" :bordered="false" :dis-hover='true'>
        <div class="card_body">
          <div class="dayRecom" @mouseenter=" dayRecomTitle = true" @mouseleave="dayRecomTitle = false" @click="dayRecomSongs">
            <div class="dayRecomTitle" :class="dayRecomTitle ? 'active' : '' ">根据您的音乐口味生成<br>每日更新</div>
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="'#icon-' + Date().slice(0,3)"></use>
            </svg>
            <div class="cloudListPlay" :class="dayRecomTitle ? 'active' : '' ">
              <Icon type="md-play"/>
            </div>
          </div>
        </div>
        <p style="margin-top: 5px;">每日推荐歌曲</p>
      </card>
      <Card :padding="0" :bordered="false" :dis-hover='true' v-for="(item,index) in homeCloudList" :key="index">
        <div class="card_body" @mouseenter="listPlayEnter(index)" @mouseleave="listPlayState = -1">
          <img :src="item.picUrl" alt="">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yousanjiao"></use>
            </svg>
            {{item.playCount >= 100000 ? Math.round(item.playCount / 10000) + '万' : item.playCount}}
          </span>
          <div class="cloudListPlay" :class="listPlayState === index ? 'active' : '' ">
            <Icon type="md-play"/>
          </div>
        </div>
        <p>{{item.name}}</p>
      </Card>
    </div>
  </div>
</template>

<script>
  import {getUserStatus, refresh} from "../../../network/cloudTop";
  import {getRecomMusicList} from "../../../network/home";

  export default {
    name: "cloudHomeList",
    props: {
      homeCloudList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        listPlayState: -1,
        dayRecomTitle:false
      }
    },
    created() {
      this.refresh();
      this.getUserStatus();
      this.getRecomMusicList();
    },
    methods: {
      listPlayEnter(index) {
        this.listPlayState = index
      },
      dayRecomSongs(){
        //跳转到每日推荐页
        this.$router.push({name:'dayRecom'});
      },
      //刷新登录
      refresh() {
        refresh().then(res => {
          console.log(res)
        })
      },
      //获取账号登录状态
      getUserStatus() {
        getUserStatus().then(res => {
          console.log(res)
        })
      },
      //每日推荐歌单
      getRecomMusicList() {
        getRecomMusicList().then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .active {
    opacity: 1 !important;
  }

  .home_list {
    color: honeydew;

    .home_list_head {
      margin: 15px 0 10px 0;
      font-size: 17px;
    }

    .home_list_body {
      .ivu-card {
        float: left;
        position: relative;
        margin: 0 15px 15px 0;
        width: 140px;
        height: 190px;
        background-color: #2b2b2b;

        span {
          position: absolute;
          top: 2px;
          right: 6px;
          color: white;
        }

        img {
          width: 140px;
          height: 140px;
          border-radius: 5px;
        }

        &:nth-child(5n) {
          margin-right: unset;
        }

        .cloudListPlay {
          position: absolute;
          bottom: 60px;
          right: 10px;
          border-radius: 15px;
          background-color: rgba(255, 255, 255, 0.7);
          opacity: 0;
          transition: opacity 0.5s;
          i {
            padding: 6px;
            color: #ec4141;
            font-size: 18px;
          }
        }
      }

      .card_body {
        .dayRecom {
          width: 140px;
          height: 140px;
          text-align: center;
          background-image: url(~assets/img/daySongs.png);
          background-size: 140px 140px;
          border-radius: 5px;
          .dayRecomTitle{
            background-color: #0000004a;
            opacity: 0;
            transition: opacity ease-in 0.75s;
          }
          svg{
            font-size: 70px
          }
        }
      }
      p{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
</style>