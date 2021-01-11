<template>
    <Footer class="layout_footer_audio">
        <Row>
            <audio ref="musicAudio" src="http://m7.music.126.net/20210111152956/699549d3bf6acff97c2eb8afb5742e01/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"></audio>
            <Col span="6" class="footer_left">
                <div class="audio_left">
                    <div class="audio_thumbnail">
                        <img src="~assets/img/sl3.jpg" alt="">
                    </div>
                    <div class="audio_song_info">
                        <div class="audio_song_name">sonder</div>
                        <div class="audio_song_author">司南</div>
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
                            <svg class="icon index_footer_icon" aria-hidden="true" @click="playMusic">
                                <use xlink:href="#icon-zanting1"></use>
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
                        <label class="audio_article_end">3.41</label>
                    </div>
                </div>
            </Col>
            <Col span="6">
                <div class="audio_foot_right">
                    <div class="audio_volume">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-yinliang3"></use>
                        </svg>
                        <Slider @input="volume_change" v-model="volume_point"></Slider>
                    </div>
                </div>
            </Col>
        </Row>
    </Footer>
</template>

<script>
    export default {
        name: "cloudFooter",
        data(){
            return{
                volume_point:0
            }
        },
        methods:{
            playMusic(){
                this.$refs.musicAudio.play();
                console.log(this.$refs.musicAudio);
            },
            volume_change(){
                this.$refs.musicAudio.volume = this.volume_point/100;
                localStorage.setItem('volume',this.volume_point);
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
            }
            .audio_article{
                width: 395px;
            }
            .audio_article_end{
                padding: 7px 0 0 10px;
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