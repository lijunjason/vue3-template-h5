<template>
  <div class="pinia">
    <div class="name">用户名:{{ userStore.name }}</div>
    <div class="length">长度:{{ userStore.nameLength }}</div>
    <div class="length">可选链测试:{{ test?.a || '11' }}</div>
    <van-button type="primary" @click="updateName(true)"
      >action修改store中的name</van-button
    >
    <van-button @click="updateName(false)">patch修改store中的name</van-button>
  </div>
  <van-button type="primary">主要按钮1</van-button>
</template>

<script name="Home" setup lang="ts">
import { useUserStore } from '@/store';

const userStore = useUserStore();
const test: any = null;
const updateName = (isAction: boolean) => {
  if (isAction) {
    userStore.updateName('userStore.updateName方式');
  } else {
    userStore.$patch({
      name: 'userStore.$patch方式',
    });
  }
};
</script>
