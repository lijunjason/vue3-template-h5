import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    isCollapse: true,
  }),
  getters: {},
  actions: {
    updateCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
});
