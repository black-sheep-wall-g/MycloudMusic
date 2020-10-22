<template>
    <Footer class="layout_footer_audio">
        <Row>
            <audio></audio>
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
                            <svg class="icon index_footer_icon" aria-hidden="true">
                                <use xlink:href="#icon-zanting1"></use>
                            </svg>
                            <svg class="icon index_footer_icon" aria-hidden="true">
                                <use xlink:href="#icon-xiayishou1"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true">
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
            <Col span="6">3</Col>
        </Row>
    </Footer>
</template>

<script>
    export default {
        name: "cloudFooter",
        methods:{
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
            align-items: end;
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
</style>