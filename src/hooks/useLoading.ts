/* eslint-disable @typescript-eslint/no-explicit-any */
import { showLoadingToast, closeToast } from 'vant';

export default function useLoading() {
  const startLoading = () => {
    showLoadingToast({
      duration: 0,
      forbidClick: true,
      message: 'Loading...',
    });
  };
  const stopLoading = () => {
    closeToast();
  };

  return { startLoading, stopLoading };
}
