<script setup lang="ts"></script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: 0.5s all linear;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
