<template>
  <div class="container" id="app">
    <!-- 引入 Player 組件 -->
    <Player :audioSrc="'/music.mp3'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Player from './components/Player.vue';

export default defineComponent({
  name: 'App',
  components: {
    Player,
  },
});
</script>

<style>
#app {
  background: radial-gradient(circle, #f6e050, #847575);

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw; /* 設定寬度為視窗寬度 */
}
audio::-internal-media-controls-download-button {
  display: none;
}

audio::-webkit-media-controls-enclosure {
  overflow: hidden;
}
</style>
