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

// Expose methods to parent component
defineExpose({
  playVideo,
  mute,
  unMute,
  player
})
</script>

<template>
  <v-col
    cols="12"
    md="6"
    class="d-flex justify-center"
  >
    <div :id="`player-${index}`"></div>
  </v-col>
</template>