<template>
    <div class="cloudSearchResult">
        <p>找到{{searchResult !== '' ? searchResult.result.songCount : '无'}}首单曲</p>
        <Tabs size="small">
            <TabPane label="单曲">单曲</TabPane>
            <TabPane label="歌手">歌手</TabPane>
            <TabPane label="专辑">专辑</TabPane>
            <TabPane label="视频">视频</TabPane>
            <TabPane label="歌单">歌单</TabPane>
            <TabPane label="歌词">歌词</TabPane>
            <TabPane label="主播电台">主播电台</TabPane>
            <TabPane label="用户">用户</TabPane>
        </Tabs>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "cloudSearchResultContent",
        data(){
            return{
                searchResult: ''
            }
        },
        methods:{
        },
        computed:{
            //监听搜索查询数据
            ...mapGetters(['getSearchResult']),
        },
        watch:{
            //监听搜索查询数据并且赋值
            getSearchResult(newResult) { //li就是改变后的wifiList值
                this.searchResult = newResult;
                console.log("改变", this.searchResult);
            }
        }
    }
</script>

<style scoped type="less">
    /deep/ .ivu-tabs-nav-scroll{
        width: 800px;
    }
</style>