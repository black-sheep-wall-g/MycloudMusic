<template>
    <Footer class="layout-footer-center">
        <Row>
            <Col span="4" class="footer_left">
                <svg class="icon index_footer_icon" aria-hidden="true">
                    <use xlink:href="#icon-shangyishou"></use>
                </svg>
                <svg class="icon index_footer_icon" aria-hidden="true">
                    <use xlink:href="#icon-zanting"></use>
                </svg>
                <svg class="icon index_footer_icon" aria-hidden="true">
                    <use xlink:href="#icon-xiayishou"></use>
                </svg>
            </Col>
            <Col span="11">


                <div class="audio">
                    <audio></audio>
                    <div class="audio-controller">
                        <span class="audio-prev"></span>
                        <span class="audio-state"></span>
                        <span class="audio-next"></span>
                    </div>
                    <div class="audio-bar">
                        <span class="audio-time-current"></span>
                        <div class="audio-progress">
                            <div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <span class="audio-time-duration"></span>
                    </div>
                    <div class="audio-volume">
                        <span class="audio-volume-icon"></span>
                        <div class="audio-volume-adjust">
                            <div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="footer_center">
                    <audio></audio>
                </div>
            </col>
            <Col span="8">3</col>
        </Row>
    </Footer>
</template>

<script>
    export default {
        name: "cloudFooter",
        methods:{
            'mousedown': function(event) {
                event.stopPropagation();
                that.dragStart(event);
                addEventListener('mousemove', function(e) {
                    that.dragging(e);
                });
                addEventListener('mouseup', function() {
                    that.dragEnd();
                });
            },
            setPosition: function(clientX) {
                const { sliderBox, thumbBox } = this;
                const contentWidth = sliderBox.offsetWidth;
                // 计算当前拖动位置与初始拖动位置的距离
                const diff = clientX - this.startX;
                // 计算差距占精度条的百分比
                const percent = (diff / contentWidth).toFixed(6) * 100;
                this.currentPosition = Math.max(0, Math.min(
                    this.startPosition + percent, 100));
                this.updateView();
            },
            dragStart: function(event) {
                this.isDragging = true;
                this.startX = event.clientX;
                this.startPosition = this.currentPosition;
            },
            dragging: function(event) {
                if (!this.isDragging) return;
                this.setPosition(event.clientX);
                if (!this.isBuffer) {
                    this.changeAudioAbort();
                }
            },
            dragEnd: function() {
                this.changeAudioAbort();
                this.isDragging = false;
                removeEventListener('mousemove', this.dragging);
                removeEventListener('mouseup', this.dragEnd);
            }

        }
    }
</script>

<style scoped>
    .ivu-layout-footer{
        padding: 15px 25px;
    }
    .footer_left{
        display: flex;
        justify-content: space-evenly;
    }
    .index_footer_icon{
        font-size: 30px;
    }
    .footer_center{
        width: 100%;
    }
</style>