<template>
    <div class="home_content">
        <div class="home_content_title">
            <Menu mode="horizontal" :active-name="0" >
                <MenuItem v-for="(item,index) in homeTitleList" :key="index" :name="index">
                    {{item}}
                </MenuItem>
            </Menu>
        </div>
        <div class="home_content_swpier"></div>
        <div class="home_content_recommend"></div>
    </div>
</template>

<script>
    export default {
        name: "cloudHomeContent",
        data(){
            return{
                homeTitleList:['个性推荐','歌单','主播电台','排行榜','歌手','最新音乐']
            }
        }
    }
</script>

<style scoped lang="less">
    .home_content{
        padding: 0 25px;
    }
</style>