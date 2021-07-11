<template>
  <div>
    <div v-if="isMobile && loadBar" class="preloader">
      <div class="mobile-scroll-loader">
        <div class="circle1 circle"></div>
        <div class="circle2 circle"></div>
        <div class="circle3 circle"></div>
        <div class="circle4 circle"></div>
        <div class="circle5 circle"></div>
        <div class="circle6 circle"></div>
        <div class="circle7 circle"></div>
        <div class="circle8 circle"></div>
        <div class="circle9 circle"></div>
        <div class="circle10 circle"></div>
        <div class="circle11 circle"></div>
        <div class="circle12 circle"></div>
      </div>
      <span class="my-10">loading...</span>
    </div>
    <navbar :loadBar="loadBar" />
    <main :class="!isMobile && 'fix-postion'">
      <router-view @loadingBar="loadingBar" />
    </main>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
  components: {
    navbar: () => import("@/components/navbar"),
  },
  data() {
    return {
        isMobile:null,
      loadBar: false,
    };
  },
   created() {
    window.addEventListener("resize", this.checkMobile);
    this.checkMobile();
  },
  destroyed() {
    window.removeEventListener("resize", this.checkMobile);
  },
  methods: {
      checkMobile() {
      this.isMobile = window.innerWidth <= 500;
    },
    loadingBar(data) {
      this.loadBar = data;
    },
  },
  metaInfo() {
    return {
      title: `YouTube`,
    };
  },
};
</script>

<style lang="scss">
.fix-postion {
  padding-top: 80px;
}
.preloader {
  align-items: center;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  transition: opacity 0.3s linear;
  width: 100%;
  z-index: 9999;
}
</style>
