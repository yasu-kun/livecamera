<script setup>
import { ref, onMounted, defineProps, watch, nextTick } from 'vue'
import YouTubePlayer from './YouTubePlayer.vue'
import PlayerControls from './PlayerControls.vue'

const props = defineProps({
  videoIds: {
    type: Array,
    required: true
  }
})

const isMuted = ref(false)
const videoWidth = ref(560)
// Keep a stable map of videoId -> child component instance
const playerMap = new Map()

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
  // To satisfy browser autoplay policies, start muted and stagger starts
  if (!isMuted.value) {
    isMuted.value = true
    props.videoIds.forEach(id => playerMap.get(id)?.mute?.())
  }
  props.videoIds.forEach((id, i) => {
    const playerRef = playerMap.get(id)
    if (playerRef?.playVideo) setTimeout(() => playerRef.playVideo(), i * 80)
  })
}

function toggleMute() {
  isMuted.value = !isMuted.value
  props.videoIds.forEach(id => {
    const playerRef = playerMap.get(id)
    if (!playerRef) return
    if (isMuted.value) playerRef.mute?.()
    else playerRef.unMute?.()
  })
}

function updateAllPlayersSize() {
  props.videoIds.forEach(id => playerMap.get(id)?.setSize?.(videoWidth.value))
}

function handleWidthChange(width) {
  videoWidth.value = width
  updateAllPlayersSize()
}

watch(
  () => props.videoIds.length,
  async () => {
    await nextTick()
    setTimeout(() => {
      updateAllPlayersSize()
      if (isMuted.value) props.videoIds.forEach(id => playerMap.get(id)?.mute?.())
    }, 250)
  }
)

// React to order changes (without forcing remount)
watch(
  () => props.videoIds.join(','),
  async () => {
    await nextTick()
    setTimeout(() => {
      updateAllPlayersSize()
      if (isMuted.value) props.videoIds.forEach(id => playerMap.get(id)?.mute?.())
    }, 200)
  }
)

function setPlayerRef(id, el) {
  if (el) playerMap.set(id, el)
  else playerMap.delete(id)
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
        v-for="(videoId, index) in props.videoIds"
        :key="videoId"
        :video-id="videoId"
        :video-width="videoWidth"
        :ref="el => setPlayerRef(videoId, el)"
      />
    </v-row>
  </v-container>
</template>

<style scoped>
.v-container {
  padding-top: 2rem;
}
</style>
