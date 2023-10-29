<script setup lang="ts">
type Props = {
  amount: number,
  maxSpeed: number,
  minSpeed: number,
  maxSize: number
};

const props = defineProps<Props>();
const windowWidth = ref<number | undefined>();
const uniqueId = ref<number | undefined>();
const container = ref<HTMLDivElement>();

function startAnimation() {
  if(!container.value) return;
  container.value.innerHTML = '';
  const amount = props.amount >= 40 && window.innerWidth <= 768? props.amount / 2 : props.amount;

  for(let i = 0; i < amount; i++) {
    const star = document.createElement('i');

    const x = Math.round(Math.random() * (container.value.clientWidth - 5) + 5);
    const size = Math.round(Math.random() * (props.maxSize - 1) + 1);
    const speed = Math.random() * (props.maxSpeed - props.minSpeed) + props.minSpeed;
    
    star.classList.add('star');
    star.style.left = `${x}px`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animation = `bottomUp ${speed}s linear infinite`;

    container.value.appendChild(star);
  }
}

watch(windowWidth, () => {
  startAnimation();
});

onMounted(() => {
  const id = Math.round(Math.random() * (10000 - 1) + 1);
  uniqueId.value = id;
  startAnimation();

  window.addEventListener('resize', () => {
    if(window.innerWidth != windowWidth.value) {
      windowWidth.value = window.innerWidth;
    }
  });
});
</script>

<template>
  <div ref="container" :id="`starscontainer-${uniqueId}`" class="relative w-full min-h-[150px] overflow-hidden"></div>
</template>

<style>
  .star {
    position: absolute;
    background-color: #ffffff;
    border-radius: 100%;
  }

  @keyframes bottomUp {
    from {
      bottom: -100px;
    } to {
      opacity: 0;
      bottom: 100%;
    }
  }
</style>