<template>
    <div class="home_content">
        <div class="home_content_title">
            <Menu mode="horizontal" :active-name="0" theme="dark">
                <MenuItem v-for="(item,index) in homeTitleList" :key="index" :name="index">
                    {{item}}
                </MenuItem>
            </Menu>
        </div>
        <div class="home_content_swiper" @mouseenter="on_top_enter" @mouseleave="on_top_leave">
            <swiper class="swiper" :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(item,index) in banners" :key="index">
                    <img :src="item.imageUrl" alt="banner">
                <span>
                    {{item.typeTitle}}
                </span>
                </swiper-slide>
                <!--分页器-->
                <div class="swiper-pagination" slot="pagination"></div>
                <!--左箭头-->
                <div class="swiper-button-prev" slot="button-prev" v-show="swiperButton"></div>
                <!--右箭头-->
                <div class="swiper-button-next" slot="button-next" v-show="swiperButton"></div>
            </swiper>
        </div>
        <div class="home_content_recommend">
            <cloudHomeList :homeCloudList="homeCloudList"></cloudHomeList>
        </div>
    </div>
</template>

<script>
    import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import {getIndexInfo, getIndexBanner, getMusicList} from "../../../network/home";
    import cloudHomeList from "./cloudHomeList";



    export default {
        name: "cloudHomeContent",
        components: {
            Swiper,
            SwiperSlide,
            cloudHomeList
        },
        data() {
            return {
                homeTitleList: ['个性推荐', '歌单', '主播电台', '排行榜', '歌手', '最新音乐'],
                //轮播图
                banners:[],
                //首页歌单列表数据
                homeCloudList:[],
                swiperButton:false,
                swiperOption: {
                    loop: true, //循环
                    autoplay: { //自动播放
                        disableOnInteraction: false,
                        delay: 2000
                    },
                    speed: 1000, //滑动速度
                    // grabCursor: true,//小手鼠标样式
                    effect: "coverflow", //翻转效果
                    centeredSlides: true,
                    loopAdditionalSlides: 10,
                    coverflowEffect: {           // coverflow 效果调整
                        rotate: 0,
                        stretch: 982, // slide左右距离
                        depth: 1000, // slide前后距离
                        modifier: 0.5,
                        slideShadows: false // 滑块遮罩层
                    },
                    pagination: { // 分页器参数选项,显示小点
                        el: '.swiper-pagination',
                        clickable: true, //分页器可点击
                        clickableClass : 'my-pagination-clickable' // 默认点击样式
                    },
                    navigation: { // 前后按钮
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                }
            }
        },
        computed: {
            mySwiper() {
                // mySwiper 是要绑定到标签中的ref属性
                return this.$refs.mySwiper.$swiper
            }
        },
        methods: {
            //轮播图事件 鼠标移入事件
            on_top_enter() {
                this.mySwiper.autoplay.stop();
                this.swiperButton = true
            },
            //鼠标移出事件
            on_top_leave() {
                this.mySwiper.autoplay.start();
                this.swiperButton = false
            },
            //首页初始化
            indexInit(){
                //获取页面基础信息
                getIndexInfo().then(res => {
                    // console.log(res);
                });
                //获取首页轮播图
                getIndexBanner().then(res =>{
                    this.banners = res.banners
                    // console.log(res)
                });
                //获取首页列表数据
                getMusicList().then(res =>{
                    // console.log(res)
                    this.homeCloudList = res.result
                })
            }
        },
        mounted() {
            //初始化数据
            this.indexInit()
        }
    }
</script>

<style scoped lang="less">
  .ivu-menu-dark{
    background:#2b2b2b;
  }
  .ivu-menu-item-active{
    border-bottom: 1px solid red;
    height: 60px;
  }
    .home_content {
        width: 820px;
        padding: 0 30px;
        overflow-y: overlay;
        &:hover{
            &::-webkit-scrollbar {
                width: 5px;
            }
        }
        &::-webkit-scrollbar {
            width: 0;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.2);
        }
        .home_content_swiper {
            width: 100%;
            .swiper {
                width: 100%;
                height: 240px;
                .swiper-slide {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    img {
                        border-radius: 10px !important;
                        height: 200px;
                        width: 540px;
                    }
                    span{
                        position: absolute;
                        bottom: 20px;
                        right: 110px;
                        padding: 2px 10px;
                        border-top-left-radius: 10px;
                        border-bottom-right-radius: 10px;
                        background-color: #cc4a4a;
                        color: white;
                        font-size: 10px;
                    }
                }
                .swiper-pagination{
                    bottom: -4px;
                }
                .swiper-button-prev,.swiper-button-next{
                    color: white;
                    background-color: rgba(255,255,255,0.2);
                    height: 26px;
                    width: 26px;
                    border-radius: 13px;
                    --swiper-navigation-size: 15px;/* 设置按钮大小 */
                }
            }
        }
    }

</style>