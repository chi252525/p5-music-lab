<template>
  <div id="main">
    <router-view />
    <div id="footer">© 2025 by BreezySerenity. All rights reserved.</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MainLayout',
});
</script>
<style scoped>
#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px; /* 設定 footer 的高度 */
  background-color: #cacaca56; /* footer 的背景顏色 */
  color: white; /* footer 的文字顏色 */
  text-align: center; /* footer 的文字置中 */
  line-height: 50px; /* footer 的文字垂直置中 */
}
</style>
