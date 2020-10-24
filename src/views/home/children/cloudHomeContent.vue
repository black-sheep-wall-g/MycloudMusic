<template>
    <div class="home_content">
        <div class="home_content_title">
            <Menu mode="horizontal" :active-name="0">
                <MenuItem v-for="(item,index) in homeTitleList" :key="index" :name="index">
                    {{item}}
                </MenuItem>
            </Menu>
        </div>
        <div class="home_content_swpier" @mouseenter="on_top_enter" @mouseleave="on_top_leave">
            <swiper class="swiper" :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(item,index) in banners" :key="index">
                    <img :src="item.imageUrl" alt="banner" style="width: 510px;border-radius: 15px">
                    <i>{{item.typeTitle}}</i>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="home_content_recommend"></div>
        </div>
    </div>
</template>

<script>
    import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import {getIndexInfo,getIndexBanner} from "../../../network/home";

    export default {
        name: "cloudHomeContent",
        components: {
            Swiper,
            SwiperSlide
        },
        data() {
            return {
                homeTitleList: ['个性推荐', '歌单', '主播电台', '排行榜', '歌手', '最新音乐'],
                banners:[],
                swiperOption: {
                    loop: true, //循环
                    autoplay: { //自动播放
                        disableOnInteraction: false,
                        delay: 1000
                    },
                    speed: 1000, //滑动速度
                    grabCursor: true,
                    effect: "coverflow", //翻转效果
                    centeredSlides: true,
                    loopAdditionalSlides: 10,
                    coverflowEffect: {           // coverflow 效果调整
                        rotate: 0,
                        stretch: 900, // slide左右距离
                        depth: 1000, // slide前后距离
                        modifier: 0.5,
                        slideShadows: false // 滑块遮罩层
                    },
                    pagination: { // 参数选项,显示小点
                        el: '.swiper-pagination'
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
            //轮播图事件
            on_top_enter() {
                this.mySwiper.autoplay.stop()
            },
            on_top_leave() {
                this.mySwiper.autoplay.start()
            },
            //首页初始化
            indexInit(){
                //获取页面基础信息
                getIndexInfo().then(res => {
                    console.log(res);
                });
                //获取首页轮播图
                getIndexBanner().then(res =>{
                    this.banners = res.banners
                    console.log(res)
                });
            }
        },
        mounted() {
            //初始化数据
            this.indexInit()
        }
    }
</script>

<style scoped lang="less">
    .home_content {
        padding: 0 25px;
        .home_content_swpier {
            width: 670px;
            height: 200px;
            .swiper {
                width: 100%;
                height: 100%;
                .swiper-slide {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 20px;
                }
            }
        }
    }

</style>