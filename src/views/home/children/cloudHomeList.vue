<template>
    <div class="home_list">
        <div class="home_list_head">
            推荐歌单
            <svg class="icon" aria-hidden="true" font-size="20px">
                <use xlink:href="#icon-arrow-l"></use>
            </svg>
        </div>
        <div class="home_list_body">
            <Card :padding="0" :bordered="false" :dis-hover='true' v-for="(item,index) in homeCloudList" :key="index">
                <div class="card_body" @mouseenter="listPlayEnter(index)" @mouseleave="listPlayLeave">
                    <img :src="item.picUrl" alt="">
                    <span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-yousanjiao"></use>
                        </svg>
                    {{item.playCount >= 100000 ? Math.round(item.playCount / 10000) + '万' : item.playCount}}
                    </span>
                    <div class="cloudListPlay" :class="listPlayState === index ? 'active' : '' ">
                        <Icon type="md-play" />
                    </div>
                </div>
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
        data(){
            return{
                listPlayState:-1
            }
        },
        mounted() {
            console.log(this.homeCloudList)
        },
        methods:{
            listPlayEnter(index){
                this.listPlayState = index
            },
            listPlayLeave(){
                this.listPlayState = -1
            }
        }
    }
</script>

<style scoped lang="less">
    .active{
        opacity: 1 !important;
    }
    .home_list {
        color: honeydew;
        .home_list_head {
            margin: 15px 0 10px 0;
            font-size: 17px;
        }

        .home_list_body {
            .ivu-card {
                float: left;
                position: relative;
                margin: 0 15px 15px 0;
                width: 140px;
                height: 190px;
                background-color: #2b2b2b;
                span{
                    position: absolute;
                    top: 2px;
                    right: 6px;
                    color: white;
                }
                img{
                    width: 140px;
                    height: 140px;
                    border-radius: 5px;
                }
                &:nth-child(5n) {
                    margin-right: unset;
                }
                .cloudListPlay{
                    position: absolute;
                    bottom: 60px;
                    right: 10px;
                    border-radius: 15px;
                    background-color: rgba(255, 255, 255, 0.7);
                    opacity: 0;
                    transition: opacity 0.5s;
                    i{
                        padding: 6px;
                        color: #ec4141;
                        font-size: 18px;
                    }
                }
            }
        }
    }
</style>