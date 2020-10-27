<template>
    <div class="home_list">
        <div class="home_list_head">
            推荐歌单
        </div>
        <div class="home_list_body">
            <Card :padding="0" :bordered="false" :dis-hover='true' v-for="(item,index) in homeCloudList" :key="index">
                <img :src="item.picUrl" alt="">
                <p>{{item.name}}</p>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cloudHomeList",
        props: {
            homeCloudList: {
                type: Array,
                default: []
            }
        },
        mounted() {
            console.log(this.homeCloudList)
        },
        methods:{

        }
    }
</script>

<style scoped lang="less">
    .home_list {

        .home_list_head {
            margin: 15px 0 10px 0;
            font-size: 17px;
        }

        .home_list_body {
            .ivu-card {
                float: left;
                margin: 0 15px 15px 0;
                width: 140px;
                height: 190px;
                img{
                    width: 140px;
                    height: 140px;
                    border-radius: 5px;
                }
                &:nth-child(5n) {
                    margin-right: unset;
                }
            }
        }
    }
</style>