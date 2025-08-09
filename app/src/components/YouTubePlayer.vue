<script setup>
import { ref, onMounted, defineProps, defineExpose } from 'vue'

const props = defineProps({
  videoId: {
    type: String,
    required: true
  },
  videoWidth: {
    type: Number,
    default: 560
  }
})

const player = ref(null)
const isReady = ref(false)
const pendingPlay = ref(false)
const desiredMuted = ref(false)

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
  player.value = new YT.Player(`player-${props.videoId}`, {
    height: '315',
    width: '560',
    videoId: props.videoId,
    playerVars: {
      enablejsapi: 1,
      rel: 0,
      modestbranding: 1,
      playsinline: 1
    },
    events: {
      onReady: onPlayerReady
    }
  })
  // Apply current desired size once created
  setTimeout(() => setSize(props.videoWidth), 0)
}

function onPlayerReady() {
  isReady.value = true
  // Apply desired mute state first
  if (desiredMuted.value && player.value?.mute) player.value.mute()
  if (!desiredMuted.value && player.value?.unMute) player.value.unMute()
  // Ensure size is correct
  setSize(props.videoWidth)
  // Start playback if requested earlier
  if (pendingPlay.value) {
    pendingPlay.value = false
    if (player.value?.playVideo) player.value.playVideo()
  }
}

function playVideo() {
  if (player.value && player.value.playVideo && isReady.value) {
    player.value.playVideo()
  } else {
    pendingPlay.value = true
  }
}

function mute() {
  desiredMuted.value = true
  if (player.value && player.value.mute && isReady.value) {
    player.value.mute()
  }
}

function unMute() {
  desiredMuted.value = false
  if (player.value && player.value.unMute && isReady.value) {
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
  <v-col cols="auto" class="d-flex pa-0">
    <div :id="`player-${videoId}`"></div>
  </v-col>
</template>
