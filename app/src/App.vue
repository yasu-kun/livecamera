<script setup>
import YouTubePlayer from './components/YouTubePlayer.vue'

const videos = [
  {
    id: 'VWpOgCVKoK4',
    title: '沖縄'
  },
  {
    id: 's--MDmshT3I',
    title: '函館山'
  },
  {
    id: 'h3pbOPE3kLs',
    title: '那覇空港'
  },
  {
    id: 'DU-tsAEboZo',
    title: '羽田空港'
  }
]
</script>

<template>
  <div class="app-container">
    <h1>YouTube監視カメラ</h1>
    <div class="video-grid">
      <YouTubePlayer
        v-for="video in videos"
        :key="video.id"
        :video-id="video.id"
        :title="video.title"
      />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
</style>
