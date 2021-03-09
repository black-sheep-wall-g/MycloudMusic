<template>
  <Footer class="layout_footer_audio">
    <Row>
      <audio ref="musicAudio" :src="songsObj.url" @timeupdate="audio_time_update"></audio>
      <Col span="6" class="footer_left">
        <div class="audio_left">
          <div class="audio_thumbnail">
            <img :src="songsUrl" alt="">
          </div>
          <div class="audio_song_info">
            <div class="audio_song_name" :title="songsName">{{songsName}}</div>
            <div class="audio_song_author" :title="songsSinger">{{songsSinger}}</div>
          </div>
          <div class="audio_like">
            <svg class="icon footer_left_icon" aria-hidden="true">
              <use xlink:href="#icon-xihuan"></use>
            </svg>
          </div>
        </div>
      </Col>
      <Col span="12">
        <div class="footer_center">
          <div class="audio_control">
            <div class="audio_control_info">
              <svg class="icon index_footer_icon" aria-hidden="true">
                <use xlink:href="#icon-liebiaoxunhuan"></use>
              </svg>
              <svg class="icon index_footer_icon" aria-hidden="true" @click="lastSong">
                <use xlink:href="#icon-shangyishou1"></use>
              </svg>
              <svg v-if="songsState" class="icon index_footer_icon" aria-hidden="true" @click="controlMusic">
                <use xlink:href="#icon-zanting1"></use>
              </svg>
              <svg v-else class="icon index_footer_icon" aria-hidden="true" @click="controlMusic">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              <svg class="icon index_footer_icon" aria-hidden="true">
                <use xlink:href="#icon-xiayishou1"></use>
              </svg>
              <svg class="icon" aria-hidden="true" style="margin-top: 3px">
                <use xlink:href="#icon-cibeifen"></use>
              </svg>
            </div>
          </div>
          <div class="audio_progress">
            <label class="audio_article_start">{{resultAudioPoint}}</label>
            <Slider class="audio_article" @on-change="audio_change" :max="songsRealTime" show-tip="never"
                    v-model="audio_point"></Slider>
            <label class="audio_article_end">{{songsTime}}</label>
          </div>
        </div>
      </Col>
      <Col span="6">
        <div class="audio_foot_right">
          <div class="audio_volume">
            <svg v-if="volumeState" class="icon" aria-hidden="true" @click="setVolumeState">
              <use xlink:href="#icon-yinliang3"></use>
            </svg>
            <svg v-else class="icon" aria-hidden="true" @click="setVolumeState">
              <use xlink:href="#icon-jingyin"></use>
            </svg>
            <Slider @input="volume_change" @on-change="volume_end" v-model="volume_point"></Slider>
          </div>
        </div>
        <svg class="icon listIcon" aria-hidden="true" @click="playListFlag = true">
          <use xlink:href="#icon-gedan"></use>
        </svg>
        <Modal width="425" v-model="playListFlag" :closable="false" :footer-hide="true">
          <div class="playTab">
            <div class="playListBtn" :class="playFlag ? 'listActive' : '' " @click="playListClick">播放列表</div>
            <div class="historyBtn"  :class="!playFlag ? 'listActive' : '' " @click="historyListClick">历史记录</div>
          </div>
          <div class="tableTitle">
            <div class="countSongs">总10首</div>
            <div class="collectAll">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shoucangjia"></use>
              </svg>
              收藏全部
            </div>
            <div class="clearAll">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-lajitong"></use>
              </svg>
              清空
            </div>
          </div>
          <Table stripe :show-header="false" :columns="playListColumns" :data="this.playList" height="430">
            <template slot-scope="{ row, index }" slot="name">
              <span>{{row.name}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="singer">
              <div class="singerStyle" :title="row.singer.map(item => item.name).join('/')"><span v-for="(item1,index1) in row.singer" :key="index1">{{index1 !== 0 ? ' / ' : ''}}<span style="cursor: pointer;" @click="toResult(index1)">{{item1.name}}</span></span></div>
            </template>
            <template slot-scope="{ row, index }" slot="time">
              <div class="singerStyle">{{row.times}}</div>
            </template>
          </Table>
        </Modal>
      </Col>
    </Row>
  </Footer>
</template>

<script>
  import {getMusicDetail, getMusicUrl} from "../../network/footAudio";

  export default {
    name: "cloudFooter",
    data() {
      return {
        //音量
        volume_point: 0,
        //歌曲url详情对象
        songsObj: {},
        //歌曲状态
        songsState: true,
        //歌曲详情
        songsDetail: {},
        //歌曲实时播放时间
        songsRealTime: 0,
        //歌曲总时长
        songsTime: '',
        //歌曲名称
        songsName: '',
        //歌曲演唱者
        songsSinger: '',
        //歌曲图片
        songsUrl: '',
        //音量状态
        volumeState: true,
        //音乐进度条
        audio_point: 0,
        //播放列表Flag
        playListFlag: false,
        //播放列表历史记录flag
        playFlag:true,
        //播放列表表头
        playListColumns: [
          {
            key: 'name',
            slot: 'name',
            width: 200
          },
          {
            key: 'singer',
            slot: 'singer',
            width: 100
          },
          {
            key: 'time',
            slot: 'time',
            width: 100
          }
        ]
      }
    },
    computed: {
      songsId() {
        return this.$store.state.songsId;
      },
      resultAudioPoint() {
        return (Math.floor((this.audio_point % 3600000) / 60000) < 10 ? '0' + Math.floor((this.audio_point % 3600000) / 60000) : Math.floor((this.audio_point % 3600000) / 60000)) + ':' + (Math.floor((this.audio_point % 60000) / 1000) < 10 ? '0' + Math.floor((this.audio_point % 60000) / 1000) : Math.floor((this.audio_point % 60000) / 1000));
      },
      //播放列表
      playList(){
        return this.$store.state.playList;
      }
    },
    watch: {
      //歌曲变化监听
      songsId: {
        deep: true,
        handler(value) {
          //获取音乐url
          this.getMusicUrl(value);
          //获取音乐detail
          this.getMusicDetail(value);
        }
      }
    },
    methods: {
      //双击播放
      playMusic() {
        this.$refs.musicAudio.play();
        //歌曲状态
        this.songsState = true;
        //歌曲进度初始化
        this.audio_point = this.$refs.musicAudio.currentTime;
      },
      //播放控制
      controlMusic() {
        if (this.songsState) {
          //暂停歌曲
          this.$refs.musicAudio.pause();
          this.songsState = false;
        } else {
          this.$refs.musicAudio.play();
          this.songsState = true;
        }
      },
      //音量设置
      volume_change() {
        this.$refs.musicAudio.volume = this.volume_point / 100;
        this.volumeState = this.volume_point !== 0;
      },
      volume_end() {
        if (this.volume_point !== 0) {
          localStorage.setItem('volume', this.volume_point);
        }
      },
      //获取音乐url
      getMusicUrl(id) {
        getMusicUrl(id).then(res => {
          if (res.code === 200) {
            this.songsObj = res.data[0];
            setTimeout(() => {
              this.playMusic();
            }, 100)
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //获取音乐详情
      getMusicDetail(ids) {
        getMusicDetail(ids).then(res => {
          if (res.code === 200) {
            this.songsDetail = res.songs[0]
            this.drawingMusicDetail(this.songsDetail);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //渲染歌曲头像及名称歌手
      drawingMusicDetail(item) {
        this.songsRealTime = item.dt;
        this.songsTime = Math.floor((item.dt % 3600000) / 60000) + ':' + (Math.floor((item.dt % 60000) / 1000) < 10 ? ('0' + Math.floor((item.dt % 60000) / 1000)) : Math.floor((item.dt % 60000) / 1000));
        this.songsName = item.name;
        this.songsSinger = item.ar[0].name;
        this.songsUrl = item.al.picUrl;
      },
      //音量状态
      setVolumeState() {
        this.volumeState = !this.volumeState;
        if (this.volumeState) {
          this.volume_point = Number(localStorage.getItem('volume'));
          this.$refs.musicAudio.volume = this.volume_point / 100;
        } else {
          this.volume_point = this.$refs.musicAudio.volume = 0;
        }
      },
      //音乐进度条变化
      audio_change(e) {
        this.audio_point = this.$refs.musicAudio.currentTime = e / 1000;
      },
      //监听音频播放进度
      audio_time_update(e) {
        this.audio_point = e.target.currentTime * 1000;
      },
      //上一首
      lastSong() {
        console.log(5521)
      },
      //播放列表
      playListClick(){
        this.playFlag = true;
      },
      //历史记录
      historyListClick(){
        this.playFlag = false;
      }
    },
    created() {
      this.volume_point = Number(localStorage.getItem('volume') === null ? this.volume_point : localStorage.getItem('volume'));
    },
    mounted() {
      this.$refs.musicAudio.volume = this.volume_point / 100;
    }
  }
</script>

<style scoped lang="less">
  /deep/ .ivu-modal-mask{
    background-color: unset;
  }
  /deep/ .ivu-modal {
    position: relative;
    top: 60px;
    left: 297px;
    .ivu-modal-content {
      border-top-right-radius: unset;
      border-bottom-right-radius: unset;
      background-color: #363636;
      .ivu-modal-body{
        height: 541px;
        padding: 0;
        .playTab{
          margin-top: 16px;
          display: inline-block;
          margin-left: 100px;
          border-radius: 15px;
          border: 1px solid #666666;
          font-size: 12px;
          cursor: pointer;
          .playListBtn{
            display: inline-block;
            padding: 5px 30px;
            color: snow;
            border-radius: 15px;
          }
          .historyBtn{
            display: inline-block;
            padding: 5px 30px;
            color: snow;
            border-radius: 15px;
          }
        }
        .tableTitle{
          display: flex;
          margin: 21px 16px;
          .countSongs{
            flex: 6;
            font-size: 12px;
          }
          .collectAll{
            flex: 3;
            font-size: 14px;
            color: snow;
            svg{
              font-size: 20px;
            }
          }
          .clearAll{
            flex: 2;
            font-size: 14px;
            color: snow;
            svg{
              font-size: 20px;
            }
          }
        }
      }
    }
  }
  .listActive{
    background-color: #666666;
  }


  .ivu-layout-footer {
    padding: 12px;
    background-color: #222225;
  }

  .footer_left {
    /*width: 106.5px;*/

    .audio_left {
      display: flex;

      .audio_thumbnail {
        width: 45px;
        height: 45px;

        img {
          width: 100%;
          border-radius: 3px;
        }
      }

      .audio_song_info {
        margin-left: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: antiquewhite;

        .audio_song_name {
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .audio_song_author {
          max-width: 130px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .audio_like {
        margin-left: 10px;

        svg {
          font-size: 18px;
          margin-top: 2px;
        }
      }
    }
  }

  .footer_center {
    height: 45px;

    .audio_control {
      display: flex;
      justify-content: center;

      .audio_control_info {
        display: flex;
        justify-content: space-evenly;
        width: 300px;

        .index_footer_icon {
          font-size: 20px;
        }
      }
    }

    .audio_progress {
      display: flex;
      justify-content: center;
      align-items: flex-end;

      .audio_article_start {
        padding: 7px 10px 0 0;
        margin-bottom: 7px;
      }

      .audio_article {
        width: 395px;
      }

      .audio_article_end {
        padding: 7px 0 0 10px;
        margin-bottom: 7px;
      }
    }
  }

  .audio_foot_right {
    width: 100px;

    .audio_volume {
      position: relative;
      padding-left: 20px;
      top: 5px;

      svg {
        position: absolute;
        font-size: 15px;
        top: -5px;
        left: 0;
      }
    }
  }

  .listIcon {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 20px;
    cursor: pointer;
  }
</style>