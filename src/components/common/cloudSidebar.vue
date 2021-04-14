<template>
  <div class="sidebar_list">
    <div class="sidebar_list_content">
      <List size="small">
        <ListItem v-for="(item,index) in findMusic" :key="index" class="sidebar_list_hover"><span
                @click="siderbarClick(item,index)">{{item}}</span></ListItem>
      </List>
      <List size="small">
        <ListItem class="audio_classify">我的音乐</ListItem>
        <ListItem>本地音乐</ListItem>
        <ListItem>下载管理</ListItem>
        <ListItem>我的音乐云盘</ListItem>
        <ListItem>我的收藏</ListItem>
        <Collapse simple>
          <Panel name="1">
            创建的歌单
            <div slot="content">
              <div class="userList" v-for="(item,index) in playlist.filter(item1 => !item1.subscribed)" :key="index" @click="toPlayListView(item)">{{ index === 0 ? '我喜欢的音乐' : item.name}}</div>
            </div>
          </Panel>
          <Panel name="2">
            收藏的歌单
            <div slot="content">
              <div class="userList" v-for="(item,index) in playlist.filter(item1 => item1.subscribed)" :key="index" @click="toPlayListView(item)">{{item.name}}</div>
            </div>
          </Panel>
        </Collapse>
      </List>
    </div>
  </div>
</template>

<script>
  import {getUserSongList} from "../../network/home";
  import {mapGetters} from "vuex";

  export default {
    name: "cloudSidebar",
    data() {
      return {
        findMusic: ['发现音乐', '视频', '朋友', '直播', '私人FM'],
        //用户歌单
        playlist:[]
      }
    },
    computed:{
      ...mapGetters(['getuserInfo']),
    },
    watch:{
      //监听用户信息变化
      getuserInfo(newVal){
        if (newVal.account !== null){
          this.getUserSongList(newVal.account.id);
        }else {
          //用户退出登录时清空
          this.playlist = [];
        }
      }
    },
    methods: {
      siderbarClick(i, index) {
        switch (index) {
          case 0 : {
            //跳转到首页
            this.$router.push({name: 'Home'})
            break;
          }
          case 1 :{
            //跳转到视频
            this.$router.push({name:'videoView'})
          }
        }
        // console.log(i, index,this.getuserInfo)
      },
      getUserSongList(uid){
          getUserSongList(uid).then(res => {
            if (res.code === 200){
              this.playlist = res.playlist;
            }
          }).catch(err => {
            console.log(err);
          })
      },
      toPlayListView(item){
        this.$router.push({name: 'playResult',query: {id:item.id}})
      }
    }
  }
</script>

<style scoped lang="less">
  .ivu-scroll-loader {
    height: 0;
  }

  .listActive{
    background-color: #333333;
    color: #ffffff;
  }

  .sidebar_list {
    width: 200px;
    height: 541px;
    overflow-y: overlay;
    border-right: 1px solid #cccccc;

    .sidebar_list_content {
      margin: 13px;

      .ivu-list-small .ivu-list-item {
        padding-left: 8px;
      }

      .audio_classify {
        color: #7c7c7c;
      }

      .ivu-collapse-simple{
        background-color: unset;
        border: none;
        /deep/ .ivu-collapse-item{
          border: none;
          .ivu-collapse-content{
            padding: 0;
            background-color: unset;
            .userList{
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 40px;
              line-height: 40px;
              padding: 0 10px;
              border-right: 5px;
              color: #dddddd;
              cursor: pointer;
              &:hover{
                background-color: #333333;
                color: #fff;
              }
            }
          }
        }
      }
      .sidebar_list_hover {
        border-radius: 3px;

        &:hover {
          background-color: #333333;
          color: whitesmoke;
        }
      }
    }

    &:hover {
      &::-webkit-scrollbar {
        width: 4px;
      }
    }

    &::-webkit-scrollbar {
      width: 0;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }

    li {
      border: none;
    }
  }
</style>