<template>
  <Table stripe :columns="columns" :data="dataList" width="820" height="487" @on-row-dblclick="playMusic">
    <template slot-scope="{ row, index }" slot="name">
            <span class="ivu-table-cell-tooltip-content">
                <span>{{'0'+(index+1)}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xihuan"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-46"></use>
                </svg>
                <Tooltip :content="row.name" max-width="350">
                    <span class="nameStyle">{{ row.name }}</span>
                </Tooltip>
            </span>
    </template>
    <template slot-scope="{ row, index }" slot="heat">
            <span class="songsHeat">
                <span class="songsHeatInline" :style="{width:row.heat + '%'}"></span>
            </span>
    </template>
  </Table>
</template>

<script>
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
                        width: 344
                    },
                    {
                        title: '歌手',
                        key: 'singer',
                        width: 120,
                        tooltip: true
                    },
                    {
                        title: '专辑',
                        key: 'album',
                        width: 150,
                        tooltip: true
                    },
                    {
                        title: '时长',
                        key: 'times',
                        width: 80
                    },
                    {
                        title: '热度',
                        key: 'heat',
                        slot: "heat",
                        width: 120
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
        watch: {
            searchResult() {
                this.init();
                this.getSongs();
            }
        },
        methods: {
            init() {
                this.songsList = this.searchResult;
              console.log(this.songsList);
            },
            getSongs() {
                this.dataList = this.songsList.songs.map(item => {
                    return {
                        name: item.name,
                        singer: item.ar[0].name,
                        album: item.al.name,
                        times: Math.floor((item.dt % 3600000) / 60000) + ':' + (Math.floor((item.dt % 60000) / 1000) < 10 ? ('0' + Math.floor((item.dt % 60000) / 1000)) : Math.floor((item.dt % 60000) / 1000)),
                        heat: item.pop,
                        id: item.id
                    };
                })
            },
            playMusic(e, i) {
                this.$store.commit('setSongsId', e.id);
            }
        }
    }
</script>

<style scoped lang="less">
  /deep/ .ivu-table-body {
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: darkcyan;
    }
  }

  .nameStyle {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
  }

  .songsHeat {
    display: inline-block;
    width: 80px;
    height: 5px;
    border-radius: 3px;
    background-color: aliceblue;

    .songsHeatInline {
      float: left;
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      background-color: lavender;
    }
  }
</style>