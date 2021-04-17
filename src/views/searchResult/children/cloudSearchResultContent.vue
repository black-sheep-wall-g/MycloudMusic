<template>
    <div class="cloudSearchResult">
        <p>找到{{searchResult.length !== 0 ? searchResult.songCount : '无'}}首单曲</p>
        <Tabs size="small">
            <TabPane :label="item" v-for="(item,index) in tabMenus" :key="index">
                <search-result-songs-list v-if="index === 0" :searchResult="searchResult"/>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import SearchResultSongsList from "./children/searchResultSongsList";
    import {getSearch} from "../../../network/cloudTop";

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
        computed:{
            search(){
                return this.$route.params.search;
            }
        },
        watch:{
            //监听搜索查询数据并且赋值
            search: {
                deep : true,
                handler(newResult){
                    this.getData(newResult);
                }
            }
        },
        methods:{
            getData(search){
                //获取搜索完成后列表并跳转页面
                getSearch(search).then(res => {
                    if (res.code === 200) {
                        this.searchResult = res.result;
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        created() {
            this.getData(this.search);
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