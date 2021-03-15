<template>
  <div class="btn">
    <slot name="leftIcon"></slot>
    <div class="btn_text">播放全部</div>
    <div class="collectRecom">
      <svg class="icon collectImg" aria-hidden="true">
        <use xlink:href="#icon-jia"></use>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Button"
  }
</script>

<style scoped lang="less">
  .btn {
    position: relative;
    width: 140px;
    height: 35px;
    line-height: 35px;
    border-radius: 18px;
    background-color: #ec4141;
    cursor: pointer;

    .btn_text {
      margin-left: 25px;
      text-align: center;
      font-size: 13px;
      color: snow;
      width: 80px;
      border-right: 1px solid #e65555;
    }

    .collectRecom {
      display: inline-block;

      .collectImg {
        font-size: 17px;
        top: 6px;
        left: 114px;
      }
    }
  }

</style>