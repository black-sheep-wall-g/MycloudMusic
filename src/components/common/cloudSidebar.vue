<template>
    <div class="sidebar_list">
        <div class="sidebar_list_content">
            <List size="small">
                <ListItem>发现音乐</ListItem>
                <ListItem>视频</ListItem>
                <ListItem>朋友</ListItem>
                <ListItem>直播</ListItem>
                <ListItem>私人FM</ListItem>
            </List>
            <List header="我的音乐" size="small">
                <ListItem>本地音乐</ListItem>
                <ListItem>下载管理</ListItem>
                <ListItem>我的音乐云盘</ListItem>
                <ListItem>我的收藏</ListItem>
            </List>
            <List header="Header" footer="Footer" size="large">
                <ListItem>This is a piece of text.</ListItem>
                <ListItem>This is a piece of text.</ListItem>
                <ListItem>This is a piece of text.</ListItem>
            </List>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cloudSidebar"
    }
</script>

<style scoped lang="less">
    .ivu-scroll-loader {
        height: 0;
    }

    .sidebar_list {
        width: 200px;
        height: 540px;
        overflow-y: auto;
        .sidebar_list_content{
            margin: 13px;
            .ivu-list-small .ivu-list-item{
                padding-left: 8px;
            }
        }
        &::-webkit-scrollbar {
            width: 4px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: rgba(0, 0, 0, 0.2);
        }
        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 0;
            background: rgba(0, 0, 0, 0.1);
        }
        li {
            border: none;
        }
    }
</style>