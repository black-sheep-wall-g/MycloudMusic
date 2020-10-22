<template>
    <div class="content">
        <Layout>
            <Header>
                <cloud-top></cloud-top>
            </Header>
            <Content :style="{minHeight: '280px', background: '#fff'}">
                <cloud-sidebar></cloud-sidebar>
            </Content>
            <template>
                <cloud-footer></cloud-footer>
            </template>
        </Layout>
    </div>
</template>

<script>
    import cloudTop from "../../components/common/cloudTop";
    import CloudFooter from "../../components/common/cloudFooter";
    import CloudSidebar from "../../components/common/cloudSidebar";

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
        max-width: 1025px;
        height: 100%;
        margin: 0 auto;
    }
    .ivu-layout-header{
        padding: 0 25px;
        height: 60px;
    }

    .layout-footer-center {
        text-align: center;
    }
</style>