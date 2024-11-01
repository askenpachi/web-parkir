// src/composables/useCustomToast.ts
import { useToast } from 'vue-toast-notification';

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = {
    success: (message: string = 'Berhasil!') => {
      toast.open({
        message,
        type: 'success',
        duration: 3000,
        position: 'top-right'
      });
    },
    
    error: (message: string = 'Terjadi Kesalahan!') => {
      toast.open({
        message,
        type: 'error',
        duration: 3000,
        position: 'top-right'
      });
    },
    
    warning: (message: string = 'Peringatan!') => {
      toast.open({
        message,
        type: 'warning',
        duration: 3000,
        position: 'top-right'
      });
    },
    
    info: (message: string = 'Informasi!') => {
      toast.open({
        message,
        type: 'info',
        duration: 3000,
        position: 'top-right'
      });
    },

    apiResponse: (success: boolean, successMsg?: string, errorMsg?: string) => {
      if (success) {
        showToast.success(successMsg);
      } else {
        showToast.error(errorMsg);
      }
    }
  };

  return showToast;
};