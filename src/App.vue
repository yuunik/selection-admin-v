<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

const router = useRouter()

const userStore = useUserStore()
// 判断用户是否登录，未登录跳转登录页
if (!userStore.getIsLogin().value) {
  router.push('/login')
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
