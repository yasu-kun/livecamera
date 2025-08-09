<script setup>
import { ref, onMounted } from 'vue'
import YouTubePlayer from './YouTubePlayer.vue'
import PlayerControls from './PlayerControls.vue'

const videoIds = [
  'VWpOgCVKoK4',
  's--MDmshT3I', 
  'h3pbOPE3kLs',
  'DU-tsAEboZo',
  'X6C2hpunZ8c'
]

const isMuted = ref(false)
const playerRefs = ref([])
const videoWidth = ref(560)

onMounted(() => {
  if (!window.YT) {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }
  // Try to apply the initial size a few times as players initialize
  const tryUpdateSizes = (count = 0) => {
    updateAllPlayersSize()
    if (count < 30) setTimeout(() => tryUpdateSizes(count + 1), 200)
  }
  tryUpdateSizes()
})

function playAll() {
  playerRefs.value.forEach(playerRef => {
    if (playerRef?.playVideo) {
      playerRef.playVideo()
    }
  })
}

function toggleMute() {
  isMuted.value = !isMuted.value
  playerRefs.value.forEach(playerRef => {
    if (playerRef) {
      if (isMuted.value) {
        playerRef.mute()
      } else {
        playerRef.unMute()
      }
    }
  })
}

function updateAllPlayersSize() {
  playerRefs.value.forEach(playerRef => {
    if (playerRef?.setSize) {
      playerRef.setSize(videoWidth.value)
    }
  })
}

function handleWidthChange(width) {
  videoWidth.value = width
  updateAllPlayersSize()
}
</script>

<template>
  <v-container fluid>
    <PlayerControls 
      :is-muted="isMuted"
      :video-width="videoWidth"
      @play-all="playAll"
      @toggle-mute="toggleMute"
      @update:videoWidth="handleWidthChange"
    />

    <v-row class="ma-0" justify="start" align="start">
      <YouTubePlayer
        v-for="(videoId, index) in videoIds"
        :key="videoId"
        :video-id="videoId"
        :index="index"
        :video-width="videoWidth"
        ref="playerRefs"
      />
    </v-row>
  </v-container>
</template>

<style scoped>
.v-container {
  padding-top: 2rem;
}
</style>
