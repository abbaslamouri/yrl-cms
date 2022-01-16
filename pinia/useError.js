import { defineStore } from 'pinia';
// import axios from 'axios'
// import Cookies from 'js-cookie'

// import { useMainStore } from '~/pinia/useMain'
// import { useCartStore } from '~/pinia/useCart'

// const http = axios.create({
//   baseURL: 'http://localhost:3000/api',
// })

export const useError = defineStore('error', {
  state: () => {
    return {
      errorMsg: null,
      snackbar: {
        show: false,
        message: '',
        type: 'error',
        duration: 10,
      },
    };
  },
  actions: {
    setSnackbar(show = false, message = '', type = 'error', duration = 30) {
      this.snackbar.show = show;
      this.snackbar.message = message;
      this.snackbar.type = type;
      this.snackbar.duration = duration;
    },
  },

  getters: {
    // isAuthenticated() {
    // 	return this.token ? true : false
    // },
    // isAdmin() {
    // 	return this.user.role === 'admin' ? true : false
    // },
  },
});
