<template>
  <Table :columns="columns" :data="dataList" :row-class-name="rowClassName" width="820" height="487" @on-row-dblclick="playMusic">
    <template slot-scope="{ row, index }" slot="name">
            <div class="songName">
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
            </div>
    </template>
    <template slot-scope="{ row, index }" slot="singer">
      <div class="singerStyle" :title="row.singer.map(item => item.name).join('/')"><span v-for="(item1,index1) in row.singer" :key="index1">{{index1 !== 0 ? ' / ' : ''}}<span style="cursor: pointer;" @click="toResult(index1)">{{item1.name}}</span></span></div>
    </template>
    <template slot-scope="{ row, index }" slot="album">
      <div class="singerStyle" :title="row.album.name">{{row.album.name}}</div>
    </template>
    <template slot-scope="{ row, index }" slot="heat">
      <span class="songsHeat">
        <span class="songsHeatInline" :style="{width:row.heat + '%'}"></span>
      </span>
    </template>
  </Table>
</template>

<script>
  import {mapGetters} from "vuex";
  import {getLikeSongs} from "../../../../network/footAudio";

  export default {
    name: "searchResultSongsList",
    data() {
      return {
        songsList: [],
        columns: [
          {
            title: '音乐标题',
            key: 'name',
            slot: "name",
            width: 400
          },
          {
            title: '歌手',
            key: 'singer',
            width: 120,
            slot: 'singer'
          },
          {
            title: '专辑',
            key: 'album',
            width: 140,
            slot:'album'
          },
          {
            title: '时长',
            key: 'times',
            width: 65
          },
          {
            title: '热度',
            key: 'heat',
            slot: "heat",
            width: 85
          }
        ],
        dataList: []
      }
    },
    props: {
      searchResult: {
        type: Object,
        default: {}
      }
    },
    computed:{
      ...mapGetters(['getPlayList','getLoveList','getSongsId','getPlayState'])
    },
    watch: {
      searchResult() {
        this.init();
        this.getSongs();
      }
    },
    methods: {
      init() {
        this.songsList = this.searchResult;
      },
      getSongs() {
        this.dataList = this.songsList.songs.map(item => {
          const m = Math.floor((item.dt % 3600000) / 60000),s = Math.floor((item.dt % 60000) / 1000);
          return {
            name: item.name,
            singer: item.ar,
            album: item.al,
            times: (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s),
            heat: item.pop,
            id: item.id,
            loveFlag: this.getLoveList.some(item1 => item1 === item.id)
          };
        })
      },
      playMusic(e, i) {
        this.getPlayList.unshift(e);
        //将歌曲加入播放列表
        this.$store.commit('setPlayList',this.getPlayList);
        this.$store.commit('setSongsId', e.id);
      },
      //点击歌手或者专辑跳转到对应的页面
      toResult(index){
        console.log(index)
      },
      //表格斑马样式
      rowClassName(row, index) {
        if (index % 2 === 0) {
          return 'ivu-table-stripe-even';
        } else return 'ivu-table-stripe-odd';
      },
      loveSong(e){
        this.dataList.map(item => {
          if (item.id === e.id){
            item.loveFlag = !item.loveFlag;
          }
        });
        getLikeSongs(e.id,!e.loveFlag).then(res => {
          if (res.code === 200){
            if (this.getLoveList.some(item => item === e.id)){
              this.$Message.success('取消喜欢成功!');
              this.$store.commit('setLoveList',this.getLoveList.filter(item => item !== e.id));
            }else {
              this.$Message.success('已添加到我喜欢的音乐!');
              this.getLoveList.push(e.id);
              this.$store.commit('setLoveList',this.getLoveList);
            }
          }
        });
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

  .loveActive{
    color: #e01c4c;
  }

  /deep/ .ivu-table{
    background-color: unset;
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
    .ivu-table-body {
      overflow-x: unset;
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: darkcyan;
      }
    }
    .ivu-table-cell{
      padding-right: unset;
      .songName {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        max-width: 400px;
      }
      .singerStyle{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
      }
      .songsHeat {
        display: inline-block;
        width: 80px;
        height: 5px;
        border-radius: 3px;
        background-color: #404040;

        .songsHeatInline {
          float: left;
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 6px;
          background-color: #484848;
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