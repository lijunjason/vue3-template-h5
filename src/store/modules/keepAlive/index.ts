import { defineStore } from 'pinia';

export const useKeepAlive = defineStore('keepAlive', {
  state: () => ({
    cachedViews: [] as string[],
  }),
  actions: {
    addCachedView(viewName: string) {
      if (!this.cachedViews.includes(viewName)) {
        this.cachedViews.push(viewName);
      }
    },
    removeCachedView(viewName: string) {
      const index = this.cachedViews.indexOf(viewName);
      if (index > -1) {
        this.cachedViews.splice(index, 1);
      }
    },
  },
});
