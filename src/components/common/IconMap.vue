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
// src/components/common/IconMap.vue
import { computed } from 'vue';
import {
  Trophy, Medal, Zap, Toolbox, GraduationCap,
  Upload, Download, Settings, AlertTriangle, Lock, Key,
  Target, Lightbulb, BookOpen, FileText, PenLine, Search,
  Rocket, BarChart3, TrendingUp, RefreshCw, CheckCircle,
  XCircle, Package, Tag, Gift, Hash, MapPin, Globe,
  Wrench, Hammer, Coins, Clapperboard, Droplets,
  Ruler, Puzzle, Flag, Palette
} from 'lucide-vue-next';

const ICON_MAP = {
  '🏆': Trophy,
  '🥇': Medal,
  '🥈': Medal,
  '🥉': Medal,
  '⚡': Zap,
  '🧰': Toolbox,
  '🎓': GraduationCap,
  '📤': Upload,
  '📥': Download,
  '⚙️': Settings,
  '⚠️': AlertTriangle,
  '🔒': Lock,
  '🔑': Key,
  '🎯': Target,
  '💡': Lightbulb,
  '📖': BookOpen,
  '📄': FileText,
  '📝': PenLine,
  '🔍': Search,
  '🚀': Rocket,
  '📊': BarChart3,
  '📈': TrendingUp,
  '🔄': RefreshCw,
  '✅': CheckCircle,
  '❌': XCircle,
  '📦': Package,
  '🏷️': Tag,
  '🎁': Gift,
  '🔢': Hash,
  '📍': MapPin,
  '🌐': Globe,
  '🛠️': Wrench,
  '🔧': Wrench,
  '🔨': Hammer,
  '💰': Coins,
  '🎬': Clapperboard,
  '🚰': Droplets,
  '🪜': TrendingUp,
  '📐': Ruler,
  '🧩': Puzzle,
  '🏁': Flag,
  '🎨': Palette,
  // 保留 emoji（氛围图标）
  '🙏': null,
  '🧑': null,
  '🤖': null,
  '👨‍🏫': null,
  '🧑‍💻': null
};

const props = defineProps({
  emoji: { type: String, required: true },
  size: { type: [Number, String], default: 32 },
  strokeWidth: { type: [Number, String], default: 2 },
  color: { type: String, default: 'currentColor' }
});

const resolvedIcon = computed(() => ICON_MAP[props.emoji] || null);
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