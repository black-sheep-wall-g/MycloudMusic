<template>
  <div class="play_list_content">
    <div class="play_list_header">
      <img class="list_pic" :src="listInfo.coverImgUrl" alt="">
      <div class="play_list_right">
        <div class="play_list_title">
          <span class="play_list_title_left">歌单</span>
          <span class="play_list_title_right">{{listInfo.name}}</span>
        </div>
        <div class="play_list_user">
          <img class="play_list_user_pic" :src="listInfo.creator === undefined ? '' : listInfo.creator.avatarUrl " alt="">
          <span class="play_list_user_name">{{listInfo.creator === undefined ? '' : listInfo.creator.nickname}}</span>
          <span>{{new Date(listInfo.createTime).toLocaleString().replace(/:\d{1,2}$/,' ')}}创建</span>
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
          <Button shape="circle" font-size="16px">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shoucangjia"></use>
            </svg>
            收藏({{listInfo.subscribedCount >= 10000 ? Math.round(listInfo.subscribedCount / 10000) + '万' : listInfo.subscribedCount}})
          </Button>
          <Button shape="circle" font-size="16px">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenxiang1"></use>
            </svg>
            分享({{listInfo.shareCount >= 10000 ? Math.round(listInfo.shareCount / 10000) + '万' : listInfo.shareCount}})
          </Button>
          <Button shape="circle" font-size="16px">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tubiaozhizuomoban"></use>
            </svg>
            下载全部
          </Button>
        </div>
        <div class="play_list_count">
          <div class="play_list_lable">标签 :
            <span>{{listInfo.tags === undefined ? '' : (listInfo.tags.length === 0 ? '添加标签' : '')}}</span>
            <span v-for="(item,index) in listInfo.tags">{{(index === 0 ? '' : ' / ') + item}}</span>
          </div>
          <div class="play_list_simple_count">
            <div class="songs_count">歌曲 : <span>{{listInfo.trackCount}}</span></div>
            <div class="play_count">播放 : <span>{{listInfo.playCount >= 100000 ? Math.round(listInfo.playCount / 10000) + '万' : listInfo.playCount}}</span></div>
          </div>
          <div class="introduc" :class="introducFlag ? '' : 'introducActive'">简介 :
            <span ref="introducOpen" :style="listInfo.description || 'color: #85b9e6;'" v-html="listInfo.description || '添加标签'"></span>
            <div ref="introducIcon">
              <svg v-if="introducFlag" class="icon" aria-hidden="true" @click="downList">
                <use xlink:href="#icon-top"></use>
              </svg>
              <svg v-else class="icon" aria-hidden="true" @click="downList">
                <use xlink:href="#icon-xiala1"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="play_list_footer">
      <Tabs value="name1">
        <TabPane label="歌曲列表" name="name1">
          <Table :columns="columns" :data="tracks" width="819" :row-class-name="rowClassName" @on-row-dblclick="playSongs">
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
        </TabPane>
        <TabPane label="评论" name="name2">评论(<span>0</span>)</TabPane>
        <TabPane label="收藏者" name="name3">收藏者</TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import {getListDetail} from "../../network/home";
  import {mapGetters} from "vuex";
  import {getLikeSongs} from "../../network/footAudio";

  export default {
    name: "playListResult",
    data(){
      return{
        //歌单基础数据
        listInfo: {},
        //歌单歌曲集合
        tracks:[],
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
        //简介展开flag , 默认不展开
        introducFlag:true,
        //喜欢列表
        loveList: []
      }
    },
    computed:{
      ...mapGetters(['getLoveList','getSongsId','getPlayState']),
      //歌单id
      id(){
        return this.$route.params.id;
      }
    },
    watch:{
      id(newVal){
        this.getListDetail(newVal);
      },
      //监听love音乐列表变化
      getLoveList(){
        this.getListDetail(this.id)
      }
    },
    methods:{
      getListDetail(id){
        getListDetail(id).then(res => {
          if (res.code === 200){
            this.listInfo = res.playlist;
            this.tracks = res.playlist.tracks.map(item => {
              const m = Math.floor((item.dt % 3600000) / 60000),s = Math.floor((item.dt % 60000) / 1000);
              return {
                name: item.name,
                singer: item.ar,
                album: item.al,
                times: (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s),
                id: item.id,
                loveFlag: this.getLoveList.some(item1 => item1 === item.id)
              };
            });
          }
        });
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
        this.$store.commit('setPlayList',this.tracks);
        //保存歌曲来源
        this.$store.commit('setSongSource',this.listInfo.name);
      },
      //简介详情展开
      downList(){
        this.introducFlag = !this.introducFlag;
      },
      //喜欢音乐
      getLikeSongs(id,like){
        getLikeSongs(id,like).then(res => {
          if (res.code === 200){
            if (this.getLoveList.some(item => item === id)){
              this.$Message.success('取消喜欢成功!');
              this.$store.commit('setLoveList',this.getLoveList.filter(item => item !== id));
            }else {
              this.$Message.success('已添加到我喜欢的音乐!');
              this.getLoveList.push(id);
              this.$store.commit('setLoveList',this.getLoveList);
            }
          }
        });
      },
      //添加给钱到喜欢歌曲列表
      loveSong(e){
        this.getLikeSongs(e.id,!e.loveFlag);
      }
    },
    created() {
      //获取当前用户喜欢音乐列表
      this.getListDetail(this.id);
    },
    updated() {
      if (this.$refs.introducOpen.offsetHeight >= 20){
        this.$refs.introducIcon.style.display = 'block';
      }else{
        this.$refs.introducIcon.style.display = 'none';
      }
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

  .introducActive{
    display: block !important;
  }

  .play_list_content{
    width: 819px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: darkcyan;
    }
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
          display: flex;
          button{
            margin-left: 10px;
            background-color: #2b2b2b;
            border: 1px solid #4a4a4a;
          }

          .all_play {
            position: relative;
            width: 140px;
            height: 32px;
            line-height: 32px;
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
        .play_list_count{
          display: flex;
          position: relative;
          margin: 18px 0;
          flex-direction: column;
          color:#d0d0d0;
          width: 500px;
          .play_list_lable{
            span{
              color: #85b9e6;
            }
          }
          .play_list_simple_count{
            display: flex;
            .songs_count{
              flex: 1;
            }
            .play_count{
              flex: 5;
            }
          }
          .introduc{
            overflow : hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            white-space: pre-line;
            svg{
              position: absolute;
              top: 44px;
              right: -20px;
            }
          }
          span{
            color: #878787;
          }
        }
      }
    }
    .play_list_footer{
      /deep/ .ivu-tabs-bar{
        border: none;
        margin: 30px 15px 0;
        color: #878787;
        .ivu-tabs-ink-bar{
          background-color: #ec4141;
        }
        .ivu-tabs-tab-active{
          color: #d0d0d0;
          font-weight: 600;
        }
        .ivu-tabs-tab:hover {
          color: #ffffff;
        }
      }

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