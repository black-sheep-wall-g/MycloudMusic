<template>
    <div class="cloudSearchResult">
        <p>找到{{searchResult !== {} ? searchResult.songCount : '无'}}首单曲</p>
        <Tabs size="small">
            <TabPane :label="item" v-for="(item,index) in tabMenus" :key="index">
                <search-result-songs-list v-if="index === 0" :searchResult="searchResult"/>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import SearchResultSongsList from "./children/searchResultSongsList";

    export default {
        name: "cloudSearchResultContent",
        components: {SearchResultSongsList},
        data(){
            return{
                //搜索返回数据
                searchResult: {},
                tabMenus:['单曲','歌手','专辑','视频','歌单','歌词','主播电台','用户']
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
                this.searchResult = newResult.result;
            }
        }
    }
</script>

<style scoped lang="less">
    /deep/ .ivu-tabs-bar{
        margin-bottom:unset;
    }
    /deep/ .ivu-tabs-nav-scroll{
        width: 800px;
    }
    .cloudSearchResult{
        width: 820px;
    }
</style>