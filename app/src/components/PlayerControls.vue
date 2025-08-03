<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isMuted: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['play-all', 'toggle-mute'])

function handlePlayAll() {
  emit('play-all')
}

function handleToggleMute() {
  emit('toggle-mute')
}
</script>

<template>
  <v-row justify="center" class="mb-6">
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
</template>