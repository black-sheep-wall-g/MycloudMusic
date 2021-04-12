<template>
  <div class="recom">
    <div class="recomHeader">
      <div class="recomTitle">
        <div class="recomImg">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="'#icon-' + Date().slice(0,3)"></use>
          </svg>
        </div>
        <div class="recomText">
          <div class="recomTextTop">每日歌曲推荐</div>
          <div class="recomTextBtm">根据你的音乐口味生成，每天6:00更新</div>
        </div>
      </div>
      <div class="recomBtn">
        <div class="allPlay">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
          <div class="playText">播放全部</div>
          <div class="collectRecom">
            <svg class="icon collectImg" aria-hidden="true">
              <use xlink:href="#icon-jia"></use>
            </svg>
          </div>
        </div>
        <div class="allCollect">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shoucangjia"></use>
          </svg>
          <div class="collectText">
            收藏全部
          </div>
        </div>
      </div>
    </div>
    <div class="recomContent">
      <Table :columns="columns" :data="dataList" width="819" :row-class-name="rowClassName" @on-row-dblclick="playSongs">
        <template slot-scope="{ row, index }" slot="name">
          <span class="ivu-table-cell-tooltip-content">
            <span v-if="row.id !== getSongsId" class="nameOrder">{{ index < 9 ? '0'+(index+1) : (index+1)}}</span>
            <svg v-else class="icon iconOrder" aria-hidden="true">
              <use :xlink:href="getPlayState ? '#icon-yinliang3' : '#icon-laba'"></use>
            </svg>
            <span :title="row.loveFlag ? '取消喜欢' : '喜欢'">
              <svg class="icon loveSongs" aria-hidden="true" @click="loveSong(row)">
                <use :xlink:href="row.loveFlag ? '#icon-xinaixin' : '#icon-aixin'"></use>
              </svg>
            </span>
            <svg class="icon downloadSongs" aria-hidden="true">
              <use xlink:href="#icon-46"></use>
            </svg>
            <span :class="row.id !== getSongsId ? 'nameStyle' : 'loveActive'" :title="row.name">{{ row.name }}</span>
          </span>
        </template>
        <template slot-scope="{ row, index }" slot="singer">
          <div class="singerStyle" :title="row.singer.map(item => item.name).join('/')"><span v-for="(item1,index1) in row.singer" :key="index1">{{index1 !== 0 ? ' / ' : ''}}<span style="cursor: pointer;" @click="toResult(index1)">{{item1.name}}</span></span></div>
        </template>
        <template slot-scope="{ row, index }" slot="album">
          <div class="singerStyle" :title="row.album.name">{{row.album.name}}</div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
  import {getRecomSongs} from "../../network/home";
  import {mapGetters} from "vuex";
  import {getLikeSongs} from "../../network/footAudio";
  import {getUserStatus} from "../../network/cloudTop";

  export default {
    name: "dayRecomSongs",
    data() {
      return {
        //表头
        columns: [
          {
            title: '音乐标题',
            key: 'name',
            slot: "name",
            width: 398
          },
          {
            title: '歌手',
            key: 'singer',
            width: 140,
            slot: 'singer'
          },
          {
            title: '专辑',
            key: 'album',
            width: 200,
            slot: 'album'
          },
          {
            title: '时长',
            key: 'times',
            width: 80
          }
        ],
        //每日推荐歌曲合集
        dayRecomList: {},
        //推荐Table
        dataList: []
      }
    },
    created() {
      this.getUserStatus();
      // this.getRecomSongs();
    },
    computed:{
      ...mapGetters(['getLoveList','getSongsId','getPlayState'])
    },
    methods: {
      //每日推荐歌曲
      getRecomSongs() {
        getRecomSongs().then(res => {
          if (res.code === 200) {
            this.dataList = res.data.dailySongs.map(item => {
              const m = Math.floor((item.dt % 3600000) / 60000),s = Math.floor((item.dt % 60000) / 1000);
              return {
                name: item.name,
                singer: item.ar,
                album: item.al,
                times: (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s),
                id: item.id,
                loveFlag: this.getLoveList.some(item1 => item1 === item.id)
              };
            })
          }
        })
      },
      //表格斑马样式
      rowClassName(row, index) {
        if (index % 2 === 0) {
          return 'ivu-table-stripe-even';
        } else return 'ivu-table-stripe-odd';
      },
      //双击播放
      playSongs(e, i){
        //播放点击的歌曲
        this.$store.commit('setSongsId', e.id);
        //将歌曲加入播放列表
        this.$store.commit('setPlayList',this.dataList);
      },
      //跳转到对应的歌手或者专辑页
      toResult(index){
        console.log(index)
      },
      //喜欢音乐
      loveSong(e){
        this.dataList.map(item => {
          if (item.id === e.id){
            item.loveFlag = !item.loveFlag;
          }
        });
        getLikeSongs(e.id,!e.loveFlag).then(res => {
          if (res.code === 200){
            this.$Message.success('操作成功!');
            if (this.getLoveList.some(item => item === e.id)){
              this.$store.commit('setLoveList',this.getLoveList.filter(item => item !== e.id));
            }else {
              this.getLoveList.push(e.id);
              this.$store.commit('setLoveList',this.getLoveList);
            }
          }
        });
      },
      //用户等登录状态
      async getUserStatus(){
        await getUserStatus().then(res => {
          console.log(res);
        })
      },
    }
  }
</script>

<style scoped lang="less">

  /deep/ .ivu-table-stripe-odd {
    background-color: #2e2e2e;
  }

  /deep/ .ivu-table-stripe-even {
    background-color: #2b2b2b;
  }
  /deep/ .ivu-table-row-hover{
    background-color: #373737;
  }
  /deep/ .ivu-table{
    &:before{
      height: 0;
    }
    th {
      &:first-child{
        text-align: center;
      }
      background-color: #2b2b2b;
      border: unset;
      color: #878787;
    }
    td {
      background-color: unset;
      border: unset;
      color: #878787;
    }
  }

  .loveActive{
    color: #e01c4c;
  }

  .recom {
    overflow-y: overlay;

    &::-webkit-scrollbar {
      width: 1px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: darkcyan;
    }

    .recomHeader {
      margin: 20px 0 5px 30px;

      .recomTitle {
        display: flex;

        .recomImg {
          svg {
            font-size: 70px;
            color: #ec4141;
          }
        }

        .recomText {
          margin-left: 30px;
          padding-top: 10px;

          .recomTextTop {
            font-size: 20px;
            font-weight: 600;
            color: whitesmoke;
          }

          .recomTextBtm {
            font-size: 13px;
            color: #878787;
          }
        }
      }

      .recomBtn {
        margin-top: 20px;
        display: flex;

        .allPlay {
          position: relative;
          width: 140px;
          height: 35px;
          line-height: 35px;
          border-radius: 10px;
          background-color: #ec4141;
          cursor: pointer;

          svg {
            font-size: 13px;
            color: snow;
            position: absolute;
            top: 10px;
            left: 20px;
          }

          .playText {
            margin-left: 25px;
            text-align: center;
            font-size: 13px;
            color: snow;
            width: 80px;
            height: 35px;
            border-right: 1px solid #e65555;
          }

          .collectRecom {
            display: inline-block;

            .collectImg {
              font-size: 20px;
              top: 6px;
              left: 113px;
            }
          }
        }

        .allCollect {
          position: relative;
          width: 115px;
          height: 35px;
          border: 1px solid #8a8a8a;
          border-radius: 10px;
          background-color: #2b2b2b;
          margin-left: 15px;
          cursor: pointer;

          svg {
            position: absolute;
            top: 5px;
            left: 15px;
            font-size: 22px;
            color: #b2b2b2;
          }

          .collectText {
            display: inline-block;
            font-size: 15px;
            color: snow;
            height: 35px;
            line-height: 35px;
            margin-left: 43px;
          }
        }
      }
    }

    .recomContent {
      height: 391px;
      /deep/ .ivu-table-cell{
        padding-right: 0;
        .singerStyle{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space:nowrap;
        }
      }
      .nameOrder{
        margin: 0 8px;
        color: #525252;
      }
      .iconOrder{
        margin: 0 8px;
        font-size: 15px;
        color: #ec4141;
      }
      .loveSongs{
        font-size: 16px;
        margin-left: 5px;
      }
      .downloadSongs{
        font-size: 16px;
        margin: 0 8px;
        color: #525252;
      }
      .nameStyle {
        color: snow;
      }
    }
  }
</style>