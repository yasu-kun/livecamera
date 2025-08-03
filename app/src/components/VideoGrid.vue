<template>
  <div class="video-grid-wrapper">
    <div
      class="video-grid"
      :style="{
        '--grid-columns': gridColumns
      }"
    >
      <YouTubePlayer
        v-for="(video, index) in videos"
        :key="index"
        :videoId="video.id"
        :title="video.title"
        :size="videoSize"
      />
    </div>
  </div>
</template>

<script>
import YouTubePlayer from './YouTubePlayer.vue'

export default {
  name: 'VideoGrid',
  components: {
    YouTubePlayer
  },
  props: {
    videos: {
      type: Array,
      required: true
    },
    gridColumns: {
      type: Number,
      default: 4
    },
    videoSize: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped>
.video-grid-wrapper {
  width: 100%;
  overflow: hidden; /* 横スクロール防止 */
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  justify-content: center;
}

.video-grid {
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: 1200px;

  /* 折り返し可能で最大列数制御 */
  grid-template-columns: repeat(auto-fit, minmax(calc(100% / var(--grid-columns) - 1rem), 1fr));
}
</style>
