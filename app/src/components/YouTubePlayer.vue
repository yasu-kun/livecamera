<script setup>
import { ref, onMounted, defineExpose } from 'vue'

const props = defineProps({
  videoId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  autoPlay: {
    type: Boolean,
    default: false
  }
})

const iframeRef = ref(null)
const isPlaying = ref(false)
const isMuted = ref(false)

const playVideo = () => {
  if (iframeRef.value && iframeRef.value.contentWindow) {
    iframeRef.value.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    isPlaying.value = true
  }
}

const pauseVideo = () => {
  if (iframeRef.value && iframeRef.value.contentWindow) {
    iframeRef.value.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
    isPlaying.value = false
  }
}

const muteVideo = () => {
  if (iframeRef.value && iframeRef.value.contentWindow) {
    iframeRef.value.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*')
    isMuted.value = true
  }
}

const unmuteVideo = () => {
  if (iframeRef.value && iframeRef.value.contentWindow) {
    iframeRef.value.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*')
    isMuted.value = false
  }
}

defineExpose({
  playVideo,
  pauseVideo,
  muteVideo,
  unmuteVideo
})
</script>

<template>
  <div class="youtube-player">
    <div class="player-container">
      <iframe
        ref="iframeRef"
        :src="`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=${autoPlay ? 1 : 0}`"
        :title="title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="player-info">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<style scoped>
.youtube-player {
  display: flex;
  flex-direction: column;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  flex: 1 1 calc(50% - 20px); /* 2列表示に変更 */
  min-width: 400px; /* 最小幅を設定 */
}

.youtube-player:hover {
  transform: translateY(-5px);
}

.player-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 のアスペクト比 */
  height: 0;
  overflow: hidden;
}

.player-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.player-info {
  padding: 10px;
  background-color: #f8f9fa;
}

.player-info h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}
</style>
