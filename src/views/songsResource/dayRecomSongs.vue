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
          <div class="palyText">播放全部</div>
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
      <Table :columns="columns" :data="dataList" width="819" :row-class-name="rowClassName">
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
      </Table>
    </div>
  </div>
</template>

<script>
  import {getRecomSongs} from "../../network/home";

  export default {
    name: "dayRecomSongs",
    data(){
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
            tooltip: true
          },
          {
            title: '专辑',
            key: 'album',
            width: 200,
            tooltip: true
          },
          {
            title: '时长',
            key: 'times',
            width: 80
          }
        ],
        //每日推荐歌曲合集
        dayRecomList:{},
        //推荐Table
        dataList:[]
      }
    },
    created() {
      this.getRecomSongs();
    },
    methods:{
      //每日推荐歌曲
      getRecomSongs() {
        getRecomSongs().then(res => {
          if (res.code === 200){
            this.dayRecomList = res;
            this.dataList = res.data.dailySongs.map(item => {
              return {
                name: item.name,
                singer: item.ar[0].name,
                album: item.al.name,
                times: Math.floor((item.dt % 3600000) / 60000) + ':' + Math.floor((item.dt % 60000) / 1000),
                id: item.id
              };
            })
          }
        })
      },
      //表格斑马样式
      rowClassName(row, index){
        console.log(row,index)
        if(index%2===0){
          return 'ivu-table-stripe-even';
        }
        else return 'ivu-table-stripe-odd';
      }
    }
  }
</script>

<style scoped lang="less">

  /deep/ .ivu-table-stripe-odd{
    background-color: #2e2e2e;
  }

  /deep/ .ivu-table-stripe-even{
    background-color: #2b2b2b;
  }
  /deep/ .ivu-table td{
    background-color: unset;

  }
  /*/deep/ .ivu-table-body {*/
  /*  tr:nth-child(even) {*/
  /*    background-color: #a31010 !important;*/
  /*  }*/
  /*}*/
  /*/deep/ .ivu-table{*/
  /*  background-color: unset;*/
  /*  tr:nth-child(even) {*/
  /*    background-color: #a31010 !important;*/
  /*  }*/
  /*  td{*/
  /*    background-color: #182328;*/
  /*    color: #fff;*/
  /*    border: none;*/
  /*  }*/
  /*  !*头部th*!*/
  /*  .ivu-table-header th{*/
  /*    color:#FFD3B4;*/
  /*    font-weight: bold;*/
  /*    background-color: #212c31;*/
  /*    border: none;*/
  /*  }*/
  /*}*/
  .recom{
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 1px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: darkcyan;
    }
    .recomHeader{
      margin: 20px 0 5px 30px;
      .recomTitle{
        display: flex;
        .recomImg{
          svg{
            font-size: 70px;
            color: #ec4141;
          }
        }
        .recomText{
          margin-left: 30px;
          padding-top: 10px;
          .recomTextTop{
            font-size: 20px;
            font-weight: 600;
            color: whitesmoke;
          }
          .recomTextBtm{
            font-size: 13px;
            color: #878787;
          }
        }
      }
      .recomBtn{
        margin-top: 20px;
        display: flex;
        .allPlay{
          position: relative;
          width: 140px;
          height: 35px;
          border-radius: 10px;
          background-color: #ec4141;
          cursor: pointer;
          svg{
            font-size: 13px;
            color: snow;
            position: absolute;
            top: 10px;
            left: 20px;
          }
          .palyText{
            display: inline-block;
            margin-left: 25px;
            text-align: center;
            font-size: 13px;
            color: snow;
            width: 80px;
            height: 35px;
            line-height: 35px;
            border-right: 1px solid snow;
          }
          .collectRecom{
            display: inline-block;
            .collectImg{
              font-size: 20px;
              top: 6px;
              left: 113px;
            }
          }
        }
        .allCollect{
          position: relative;
          width: 115px;
          height: 35px;
          border: 1px solid #8a8a8a;
          border-radius: 10px;
          background-color: #2b2b2b;
          margin-left: 15px;
          cursor: pointer;
          svg{
            position: absolute;
            top: 5px;
            left: 15px;
            font-size: 22px;
            color: #b2b2b2;
          }
          .collectText{
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
    .recomContent{
      height: 391px;
    }
  }
</style>