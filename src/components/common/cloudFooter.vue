<template>
    <Footer class="layout_footer_audio">
        <Row>
            <audio ref="musicAudio" :src="songsObj.url"></audio>
            <Col span="6" class="footer_left">
                <div class="audio_left">
                    <div class="audio_thumbnail">
                        <img :src="songsUrl" alt="">
                    </div>
                    <div class="audio_song_info">
                        <div class="audio_song_name">{{songsName}}</div>
                        <div class="audio_song_author">{{songsSinger}}</div>
                    </div>
                    <div class="audio_like">
                        <svg class="icon footer_left_icon" aria-hidden="true">
                            <use xlink:href="#icon-xihuan"></use>
                        </svg>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="footer_center">
                    <div class="audio_control">
                        <div class="audio_control_info">
                            <svg class="icon index_footer_icon" aria-hidden="true">
                                <use xlink:href="#icon-liebiaoxunhuan"></use>
                            </svg>
                            <svg class="icon index_footer_icon" aria-hidden="true">
                                <use xlink:href="#icon-shangyishou1"></use>
                            </svg>
                            <svg v-if="songsState" class="icon index_footer_icon" aria-hidden="true" @click="controlMusic">
                                <use xlink:href="#icon-zanting1"></use>
                            </svg>
                            <svg v-else class="icon index_footer_icon" aria-hidden="true" @click="controlMusic">
                                <use xlink:href="#icon-bofang"></use>
                            </svg>
                            <svg class="icon index_footer_icon" aria-hidden="true">
                                <use xlink:href="#icon-xiayishou1"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true" style="margin-top: 3px">
                                <use xlink:href="#icon-cibeifen"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="audio_progress">
                        <label class="audio_article_start">0.0</label>
                        <Slider class="audio_article"></Slider>
                        <label class="audio_article_end">{{songsTime}}</label>
                    </div>
                </div>
            </Col>
            <Col span="6">
                <div class="audio_foot_right">
                    <div class="audio_volume">
                        <svg v-if="volumeState" class="icon" aria-hidden="true" @click="setVolumeState">
                            <use xlink:href="#icon-yinliang3"></use>
                        </svg>
                        <svg v-else class="icon" aria-hidden="true" @click="setVolumeState">
                            <use xlink:href="#icon-jingyin"></use>
                        </svg>
                        <Slider @input="volume_change" @on-change="volume_end" v-model="volume_point"></Slider>
                    </div>
                </div>
            </Col>
        </Row>
    </Footer>
</template>

<script>
    import {getMusicDetail, getMusicUrl} from "../../network/footAudio";

    export default {
        name: "cloudFooter",
        data(){
            return{
                //音量
                volume_point:0,
                //歌曲url详情对象
                songsObj:{},
                //歌曲状态
                songsState:true,
                //歌曲详情
                songsDetail:{},
                //歌曲实时播放时间
                songsRealTime:'',
                //歌曲总时长
                songsTime:'',
                //歌曲名称
                songsName:'',
                //歌曲演唱者
                songsSinger:'',
                //歌曲图片
                songsUrl:'',
                //音量状态
                volumeState:true,
            }
        },
        computed:{
            songsId(){
                return this.$store.state.songsId;
            }
        },
        watch:{
            songsId:{
                deep:true,
                handler(value) {
                    //获取音乐url
                    this.getMusicUrl(value);
                    //获取音乐detail
                    this.getMusicDetail(value);
                }
            }
        },
        methods:{
            //双击播放
            playMusic(){
                this.$refs.musicAudio.play();
                this.songsState = true;
            },
            //播放控制
            controlMusic(){
                if (this.songsState){
                    //暂停歌曲
                    this.$refs.musicAudio.pause();
                    this.songsState = false;
                }else {
                    this.$refs.musicAudio.play();
                    this.songsState = true;
                }
            },
            //音量设置
            volume_change(){
                this.$refs.musicAudio.volume = this.volume_point/100;
                this.volumeState = this.volume_point !== 0;
            },
            volume_end(){
                if (this.volume_point !== 0){
                    localStorage.setItem('volume',this.volume_point);
                }
            },
            //获取音乐url
            getMusicUrl(id){
                getMusicUrl(id).then(res => {
                    if (res.code === 200) {
                        this.songsObj = res.data[0];
                        setTimeout(()=>{
                            this.playMusic();
                        },100)
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取音乐详情
            getMusicDetail(ids){
                getMusicDetail(ids).then(res => {
                    if (res.code === 200) {
                        debugger;
                        console.log(res);
                        this.songsDetail = res.songs[0]
                        this.drawingMusicDetail(this.songsDetail);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //渲染歌曲头像及名称歌手
            drawingMusicDetail(item){
                let time = item.dt
                this.songsTime = Math.floor((time % 3600000) / 60000) + ':' + Math.floor((time % 60000) / 1000);
                this.songsName = item.name;
                this.songsSinger = item.ar[0].name;
                this.songsUrl = item.al.picUrl;
            },
            //音量状态
            setVolumeState(){
                this.volumeState = !this.volumeState;
                if (this.volumeState){
                    this.volume_point = Number(localStorage.getItem('volume'));
                    this.$refs.musicAudio.volume = this.volume_point/100;
                }else {
                    this.volume_point = this.$refs.musicAudio.volume = 0;
                }
            }

        },
        created() {
            this.volume_point = Number(localStorage.getItem('volume') === null ? this.volume_point : localStorage.getItem('volume'));
        },
        mounted() {
            this.$refs.musicAudio.volume = this.volume_point/100;
        }
    }
</script>

<style scoped lang="less">
    .ivu-layout-footer{
        padding: 12px;
        background-color: #222225;
    }
    .footer_left{
        /*width: 106.5px;*/
       .audio_left{
           display: flex;
           .audio_thumbnail{
               width: 45px;
               height: 45px;
               img{
                   width: 100%;
                   border-radius: 3px;
               }
           }
           .audio_song_info{
               margin-left: 12px;
               display: flex;
               flex-direction: column;
               justify-content: space-between;
               color: antiquewhite;
               .audio_song_name{}
               .audio_song_author{}
           }
           .audio_like{
               margin-left: 10px;
               svg{
                   font-size: 18px;
                   margin-top: 2px;
               }
           }
       }
    }
    .footer_center{
        height: 45px;
        .audio_control{
            display: flex;
            justify-content: center;
            .audio_control_info{
                display: flex;
                justify-content: space-evenly;
                width: 300px;
                .index_footer_icon{
                    font-size: 20px;
                }
            }
        }
        .audio_progress{
            display: flex;
            justify-content: center;
            align-items: flex-end;
            .audio_article_start {
                padding: 7px 10px 0 0;
                margin-bottom: 7px;
            }
            .audio_article{
                width: 395px;
            }
            .audio_article_end{
                padding: 7px 0 0 10px;
                margin-bottom: 7px;
            }
        }
    }
    .audio_foot_right{
        width: 100px;
        .audio_volume{
            position: relative;
            padding-left: 20px;
            top: 5px;
            svg{
                position: absolute;
                font-size: 15px;
                top: -5px;
                left: 0;
            }
        }
    }
</style>