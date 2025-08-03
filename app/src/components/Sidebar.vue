<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-header">
      <h3>表示設定</h3>
    </div>
    <div class="sidebar-content">
      <div class="setting-item">
        <label>グリッド列数: {{ gridColumns }}列</label>
        <v-slider
          v-model="gridColumns"
          :min="1"
          :max="6"
          :step="1"
          thumb-label
          @update:model-value="updateSettings"
          color="primary"
        ></v-slider>
      </div>
      
      <div class="setting-item">
        <label>動画サイズ: {{ videoSizeLabels[videoSize] }}</label>
        <v-slider
          v-model="videoSize"
          :min="0"
          :max="9"
          :step="1"
          :tick-labels="videoSizeLabels"
          thumb-label
          @update:model-value="updateSettings"
          color="primary"
        ></v-slider>
      </div>
      
      <div class="setting-item">
        <h4>動画制御</h4>
        <div class="control-buttons">
          <v-btn @click="playAllVideos" color="success" variant="flat" block>
            <v-icon left>mdi-play</v-icon>
            一括再生
          </v-btn>
          <v-btn @click="muteAllVideos" color="error" variant="flat" block>
            <v-icon left>{{ isMuted ? 'mdi-volume-high' : 'mdi-volume-off' }}</v-icon>
            {{ isMuted ? 'ミュート解除' : '一括ミュート' }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      gridColumns: 3,
      videoSize: 1,
      isMuted: false,
      videoSizeLabels: ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5']
    }
  },
  methods: {
    updateSettings() {
      this.$emit('settings-updated', {
        gridColumns: this.gridColumns,
        videoSize: this.videoSize
      })
    },
    playAllVideos() {
      this.$emit('play-all-videos')
    },
    muteAllVideos() {
      this.isMuted = !this.isMuted
      this.$emit('toggle-mute-all-videos', this.isMuted)
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 250px;
  height: 100%;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  transition: left 0.3s ease;
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0,0,0,0.2);
}

.sidebar.open {
  left: 0;
}

.sidebar-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #34495e;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-item label {
  font-weight: bold;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.radio-group label {
  font-weight: normal;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.radio-group input[type="radio"] {
  transform: scale(1.2);
}

.setting-item input[type="checkbox"] {
  transform: scale(1.2);
  margin-right: 8px;
}


.control-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.setting-item h4 {
  margin: 0 0 10px 0;
  color: #ecf0f1;
  font-size: 16px;
}
</style>
