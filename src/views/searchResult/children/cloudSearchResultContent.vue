<template>
    <div class="cloudSearchResult">
        <p>找到首单曲</p>
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
            //数据初始化
            async init(){
                //拿搜索数据
                // this.searchResults = this.$route.query.searchResult;
                // console.log(this.searchResults);
                // console.log(this.getSearchResult)
                // console.log(this.$store.state)
            }
        },
        computed:{
            //监听搜索查询数据
            ...mapGetters(['getSearchResult']),
        },
        watch:{
            //监听搜索查询数据
            getSearchResult(newResult) { //li就是改变后的wifiList值
                // this.getAllId(li); //调用别的函数
                this.searchResult = newResult;
                console.log("改变", newResult);
            }
        },
        created() {
            //数据初始化
            this.init();
        }
    }
</script>

<style scoped>

</style>