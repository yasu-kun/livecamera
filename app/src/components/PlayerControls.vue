<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isMuted: {
    type: Boolean,
    required: true
  },
  videoWidth: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['play-all', 'toggle-mute', 'update:videoWidth'])

function handlePlayAll() {
  emit('play-all')
}

function handleToggleMute() {
  emit('toggle-mute')
}

function handleWidthChange(val) {
  emit('update:videoWidth', val)
}
</script>

<template>
  <v-row justify="center" class="mb-2">
    <v-col cols="auto">
      <v-btn
        color="primary"
        size="large"
        prepend-icon="mdi-play"
        @click="handlePlayAll"
        class="mr-4"
      >
        再生
      </v-btn>
      <v-btn
        :color="isMuted ? 'error' : 'secondary'"
        size="large"
        :prepend-icon="isMuted ? 'mdi-volume-off' : 'mdi-volume-high'"
        @click="handleToggleMute"
      >
        {{ isMuted ? 'ミュート解除' : 'ミュート' }}
      </v-btn>
    </v-col>
  </v-row>
  <v-row justify="center" class="mb-6">
    <v-col cols="12" md="8" lg="6">
      <v-slider
        :model-value="props.videoWidth"
        @update:modelValue="handleWidthChange"
        min="240"
        max="1280"
        step="10"
        color="primary"
        thumb-label
      >
        <template #prepend>
          <v-icon class="mr-2">mdi-video</v-icon>
        </template>
        <template #append>
          <div class="text-caption ml-2">{{ props.videoWidth }}px</div>
        </template>
      </v-slider>
    </v-col>
  </v-row>
</template>
