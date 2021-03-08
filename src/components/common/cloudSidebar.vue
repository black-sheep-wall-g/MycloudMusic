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
        <ListItem>我的收藏</ListItem>
        <ListItem>我的收藏</ListItem>
        <ListItem>我的收藏</ListItem>
        <ListItem>我的收藏</ListItem>
        <ListItem>我的收藏</ListItem>
        <ListItem>我的收藏</ListItem>
        <ListItem>我的收藏</ListItem>
        <ListItem>我的收藏</ListItem>
        <ListItem>我的收藏</ListItem>
        <ListItem>我的收藏</ListItem>
        <ListItem>我的收藏</ListItem>
        <ListItem>我的收藏</ListItem>
      </List>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cloudSidebar",
    data() {
      return {
        findMusic: ['发现音乐', '视频', '朋友', '直播', '私人FM']
      }
    },
    methods: {
      siderbarClick(i, index) {
        if (index === 0) {
          //跳转到首页
          this.$router.push({path: '/'})
        }
        console.log(i, index)
      }
    }
  }
</script>

<style scoped lang="less">
  .ivu-scroll-loader {
    height: 0;
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