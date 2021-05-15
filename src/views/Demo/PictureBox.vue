<template>
  <div class="page-picture-box">
    <div class="picture-box">
      <img src="../../assets/logo.png" alt="" class="picture-box__img">
      <span class="picture-box__tag">tag</span>
    </div>
  </div>
</template>

<style lang="less">
  @import "~@/style/index";

  .picture-box {
    #PictureBox.wrap(200px, 200px);
    &__img {
      #PictureBox.img();
    }
    &__tag {
      #PictureBox.tag();
    }
  }
</style>
