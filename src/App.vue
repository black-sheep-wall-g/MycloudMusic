<template>
  <div id="app" class="content">
    <Layout>
      <Header style="border-bottom: 1px solid red">
        <cloud-top></cloud-top>
      </Header>
      <Content :style="{minHeight: '280px', background: '#2b2b2b',display:'flex'}">
        <cloud-sidebar v-show="$route.name!=='playVideo'"></cloud-sidebar>
        <router-view/>
      </Content>
      <template>
        <cloud-footer style="height: 70px;border-top: 1px solid;z-index: 1;"></cloud-footer>
      </template>
    </Layout>
  </div>
</template>

<script>
  import cloudTop from "./components/common/cloudTop";
  import CloudFooter from "./components/common/cloudFooter";
  import CloudSidebar from "./components/common/cloudSidebar";

  export default {
    name: "Home",
    components: {
      CloudSidebar,
      cloudTop,
      CloudFooter
    }
  }
</script>

<style scoped>
  .content{
    height: 670px;
  }
  .ivu-layout {
    background: #dcdee2;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    max-width: 1020px;
    height: 100%;
    margin: 0 auto;
  }
  .ivu-layout-header{
    padding: 0 25px;
    height: 60px;
    background-color: #515a6e;
  }

  .layout-footer-center {
    text-align: center;
  }
</style>