<script setup lang="ts">
  const { size, color } = defineProps(['size', 'color']);
</script>

<template>
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg" :fill="color" :width="size" :height="size" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none">
    <path d="M2300 4844 c-14 -2 -65 -9 -115 -15 -365 -45 -722 -221 -1004 -493
-297 -288 -475 -638 -535 -1047 -23 -157 -24 -2440 -1 -2538 53 -225 253 -419
480 -466 325 -68 647 129 742 455 13 44 17 121 20 387 l5 332 571 4 c548 3
576 4 672 26 682 152 1179 651 1327 1332 30 140 33 493 5 634 -141 713 -681
1245 -1392 1372 -68 12 -172 16 -420 18 -181 2 -341 1 -355 -1z"/>
    </g>
  </svg>
</template>