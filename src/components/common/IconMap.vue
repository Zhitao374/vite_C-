<template>
  <component
    :is="resolvedIcon"
    v-if="resolvedIcon"
    :size="size"
    :stroke-width="strokeWidth"
    :color="color"
    class="icon-svg"
  />
  <span v-else class="icon-emoji">{{ emoji }}</span>
</template>

<script setup>
import { computed } from 'vue';
import * as LucideIcons from 'lucide-vue-next';

const props = defineProps({
  emoji: { type: String, required: true },
  size: { type: [Number, String], default: 32 },
  strokeWidth: { type: [Number, String], default: 2 },
  color: { type: String, default: 'currentColor' }
});

// emoji → Lucide 图标名（PascalCase）
const ICON_MAP = {
  // ─── 通用 ───
  '🏆': 'Trophy',
  '🥇': 'Medal',
  '🥈': 'Medal',
  '🥉': 'Medal',
  '⚡': 'Zap',
  '🧰': 'Toolbox',
  '🎓': 'GraduationCap',
  '📤': 'Upload',
  '📥': 'Download',
  '⚙️': 'Settings',
  '⚠️': 'AlertTriangle',
  '🔒': 'Lock',
  '🔑': 'Key',
  '🎯': 'Target',
  '💡': 'Lightbulb',
  '📖': 'BookOpen',
  '📄': 'FileText',
  '📝': 'PenLine',
  '🔍': 'Search',
  '🚀': 'Rocket',
  '📊': 'BarChart3',
  '📈': 'TrendingUp',
  '🔄': 'RefreshCw',
  '✅': 'CheckCircle',
  '❌': 'XCircle',
  '📦': 'Package',
  '🏷️': 'Tag',
  '🎁': 'Gift',
  '🔢': 'Hash',
  '📍': 'MapPin',
  '🌐': 'Globe',
  '🛠️': 'Wrench',
  '🔧': 'Wrench',
  '🔨': 'Hammer',
  '💰': 'Coins',
  '🎬': 'Clapperboard',
  '🚰': 'Droplets',
  '🪜': 'TrendingUp',
  '📐': 'Ruler',
  '🧩': 'Puzzle',
  '🏁': 'Flag',
  '🎨': 'Palette',
  '🙏': null,  // 保留 emoji（氛围图标）
  '🧑': null,
  '🤖': null,
  '👨‍🏫': null,
  '🧑‍💻': null,
};

const resolvedIcon = computed(() => {
  const name = ICON_MAP[props.emoji];
  if (!name) return null;
  return LucideIcons[name] || null;
});
</script>

<style scoped>
.icon-svg {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
.icon-emoji {
  font-size: inherit;
  line-height: 1;
}
</style>