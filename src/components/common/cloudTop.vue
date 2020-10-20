<template>
    <Row>
        <Col span="5" class="nav_left">
            <svg class="icon index_cloud_icon" aria-hidden="true">
                <use xlink:href="#icon-wangyiyun"></use>
            </svg>
            <i>网易云音乐</i>
        </Col>
        <Col span="10">
            <div class="nav_center">
                <div class="nav_go">
                    <span>
                         <Icon color="white" size="20" type="ios-arrow-back"/>
                    </span>
                    <span>
                        <Icon color="white" size="20" type="ios-arrow-forward"/>
                    </span>
                </div>
                <Input search placeholder="搜索音乐，视频，歌词，电台"/>
            </div>
        </col>
        <Col span="8">3</col>
    </Row>
</template>

<script>
    export default {
        name: "cloudTop"
    }
</script>

<style scoped>
    .nav_left {
        display: flex;
        align-items: center;
    }

    .nav_left i {
        margin-left: 5px;
        color: aquamarine;
        font-size: 20px;
    }

    .nav_center {
        display: flex;
        align-items: center;
    }

    .nav_go {
        display: flex;
        margin-right: 20px;
    }

    .nav_go i {
        border: 1px solid #324166;
    }

    .index_cloud_icon {
        font-size: 40px;
    }
</style>