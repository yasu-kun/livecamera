<script setup>
import { ref, onMounted } from 'vue'
import YouTubePlayer from './YouTubePlayer.vue'
import PlayerControls from './PlayerControls.vue'

const videoIds = [
  'VWpOgCVKoK4',
  's--MDmshT3I', 
  'h3pbOPE3kLs',
  'DU-tsAEboZo'
]

const isMuted = ref(false)
const playerRefs = ref([])

onMounted(() => {
  if (!window.YT) {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }
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
</script>

<template>
  <v-container fluid>
    <PlayerControls 
      :is-muted="isMuted"
      @play-all="playAll"
      @toggle-mute="toggleMute"
    />

    <v-row>
      <YouTubePlayer
        v-for="(videoId, index) in videoIds"
        :key="videoId"
        :video-id="videoId"
        :index="index"
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