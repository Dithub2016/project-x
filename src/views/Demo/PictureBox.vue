<template>
  <div class="page-picture-box">
    <div class="picture-box">
      <img src="../../assets/logo.png" alt="" class="picture-box__img">
      <span class="picture-box__tag">tag</span>
    </div>
  </div>
</template>

<style lang="less">
  /*------------------------------------*\
    #PictureBox
  \*------------------------------------*/
  #PictureBox() {
    .wrap(@width, @height) {
      position: relative;
      width: @width;
      height: @height;
    }
    .img() {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .tag() {
      position: absolute;
      right: 8px;
      bottom: 8px;
      z-index: 2;
    }
  }

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
