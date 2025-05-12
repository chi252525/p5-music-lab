<template>
  <div class="player-container">
    <!-- 用 p5.js 顯示 Canvas -->
    <div ref="canvasContainer" class="canvas-container"></div>
    <div class="text-container">Orange</div>
    <!-- 音樂播放器，放在頁面底部 -->
    <div class="audio-visualizer">
      <av-line
        :line-width="3"
        :line-color="'#adaca5'"
        :src="audioSrc"
      ></av-line>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { AVLine } from 'vue-audio-visual';
import p5 from 'p5';
import { Particle } from '../utils/Particle';

export default defineComponent({
  name: 'Player',
  components: {
    AVLine,
  },
  props: {
    audioSrc: {
      type: String,
      default: '/music.mp3', // 默認音樂來源
    },
  },
  setup(props) {
    const canvasContainer = ref(null);

    let particles: Particle[] = [];
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    const animationStarted = ref(false);

    // 用 p5.js 初始化 Canvas
    onMounted(() => {
      const audioEl = document.querySelector('audio') as HTMLAudioElement;
      if (!audioEl) return;

      audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audioEl);
      analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      audioEl.addEventListener('play', () => {
        audioContext.resume();
        animationStarted.value = true;
      });

      audioEl.addEventListener('pause', () => {
        animationStarted.value = false;
      });
      new p5((sketch) => {
        sketch.setup = () => {
          sketch.createCanvas(400, 400).parent(canvasContainer.value);
          for (let i = 0; i < 200; i++) {
            particles.push(new Particle(sketch));
          }
        };
        sketch.draw = () => {
          if (!animationStarted.value) return;

          analyser.getByteFrequencyData(dataArray);
          const avgVolume =
            dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

          sketch.background(25, 25, 25);
          for (let i = 0; i < particles.length; i++) {
            particles[i].update(sketch, avgVolume);
            particles[i].show(sketch);
            if (particles[i].isOutOfBounds(sketch)) {
              particles[i] = new Particle(sketch);
            }
          }
        };
      });
    });

    return {
      canvasContainer,
      audioSrc: props.audioSrc,
    };
  },
});
</script>

<style scoped>
.player-container {
  display: flex;
  border-radius: 25px; /* 設置圓角 */
  box-shadow: 0 4px 10px rgba(238, 224, 224, 0.5); /* 可選：添加陰影以增強視覺效果 */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f6e050;
  background: linear-gradient(to bottom, #f6e050, #847575); /* 漸層背景 */
}
/* 響應式設計 */
@media (max-width: 768px) {
  .player-container {
    padding: 10px;
    width: 90%;
  }
}

@media (max-width: 480px) {
  .player-container {
    flex-direction: column;
    padding: 5px;
    width: 80%;
  }
  .canvas-container {
    width: 100%;
    height: 200px; /* 調整高度以適應小屏幕 */
  }
}
.canvas-container {
  width: 100%;
  max-width: 600px;
}

.audio-visualizer {
  width: 100%;
  display: contents;
  padding: 30px;
  margin-top: 50px;
}
.text-container {
  position: relative;
  top: -30px; /* 往上疊 */
  /* 靠左 */
  margin-left: -45%; /* 留邊距 */
  font-style: italic;
  color: rgb(252, 252, 252);
  background-color: black;
  font-size: 24px;
  padding: 3px;
  font-family:
    'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans',
    Arial, sans-serif;
  pointer-events: none;
  border: rgb(0, 0, 0) solid 1px;
}
</style>
