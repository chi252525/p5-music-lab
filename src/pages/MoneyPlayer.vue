<template>
  <Player :audioSrc="'/music.mp3'" />
</template>
<script>
import { defineComponent } from 'vue';
import Player from './components/Player.vue';
export default defineComponent({
  name: 'IndexPage',
  components: {
    Player,
  },
});
</script>
