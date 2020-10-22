<template>
    <div class="sidebar_list">
        <List border>
            <ListItem>发现音乐</ListItem>
            <ListItem>视频</ListItem>
            <ListItem>朋友</ListItem>
            <ListItem>直播</ListItem>
            <ListItem>私人FM</ListItem>
        </List>
        <List header="我的音乐" border size="small">
            <ListItem>本地音乐</ListItem>
            <ListItem>下载管理</ListItem>
            <ListItem>我的音乐云盘</ListItem>
            <ListItem>我的收藏</ListItem>
        </List>
        <List header="Header" footer="Footer" border size="large">
            <ListItem>This is a piece of text.</ListItem>
            <ListItem>This is a piece of text.</ListItem>
            <ListItem>This is a piece of text.</ListItem>
        </List>
    </div>
</template>

<script>
    export default {
        name: "cloudSidebar"
    }
</script>

<style scoped>

</style>