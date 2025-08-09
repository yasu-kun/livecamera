<script setup>
import { ref, onMounted, defineProps, defineExpose } from 'vue'

const props = defineProps({
  videoId: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  videoWidth: {
    type: Number,
    default: 560
  }
})

const player = ref(null)

onMounted(() => {
  // Wait for YouTube API to be available
  const checkAPI = () => {
    if (window.YT && window.YT.Player) {
      initializePlayer()
    } else {
      setTimeout(checkAPI, 100)
    }
  }
  checkAPI()
})

function initializePlayer() {
  player.value = new YT.Player(`player-${props.index}`, {
    height: '315',
    width: '560',
    videoId: props.videoId,
    playerVars: {
      enablejsapi: 1,
      rel: 0,
      modestbranding: 1
    }
  })
}

function playVideo() {
  if (player.value && player.value.playVideo) {
    player.value.playVideo()
  }
}

function mute() {
  if (player.value && player.value.mute) {
    player.value.mute()
  }
}

function unMute() {
  if (player.value && player.value.unMute) {
    player.value.unMute()
  }
}

function setSize(width) {
  const w = Math.max(120, Math.min(1920, Number(width) || 560))
  const h = Math.round(w * 9 / 16)
  if (player.value && player.value.setSize) {
    player.value.setSize(w, h)
  }
}

// Expose methods to parent component
defineExpose({
  playVideo,
  mute,
  unMute,
  player,
  setSize
})
</script>

<template>
  <v-col
    cols="auto"
    class="d-flex pa-0"
  >
    <div :id="`player-${index}`"></div>
  </v-col>
</template>
