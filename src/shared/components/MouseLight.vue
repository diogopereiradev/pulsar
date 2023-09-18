<script setup lang="ts">
onMounted(() => {
  window.addEventListener('mousemove', (ev) => {
    const el = document.querySelector<HTMLDivElement>('#mouselight');
    const x = `${ev.x - 150}px`;
    const y = `${ev.y - 150}px`;

    if(el) {
      el.style.left = x;
      el.style.top = y;
    }
  });
});
</script>

<template>
  <div class="[@media_(pointer:coarse)]:hidden [@media_(pointer:fine)]:fixed left-0 top-0 w-screen h-screen overflow-hidden pointer-events-none">
    <div id="mouselight" class="absolute left-0 top-0 w-[300px] h-[300px] rounded-full blur-[50px] bg-primary/5 z-[-9999]"></div>
  </div>
</template>