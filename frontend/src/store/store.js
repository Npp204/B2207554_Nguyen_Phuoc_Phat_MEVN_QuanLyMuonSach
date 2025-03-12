import { createStore } from 'vuex';

export default createStore({
  state: {
    userRole: localStorage.getItem('userRole') || '', // Lấy từ localStorage nếu có
  },
  mutations: {
    setUserRole(state, role) {
      state.userRole = role;
      localStorage.setItem('userRole', role); // Cập nhật vào localStorage
    },
  },
  actions: {
    login({ commit }, role) {
      commit('setUserRole', role);
    },
    logout({ commit }) {
      commit('setUserRole', '');
      localStorage.removeItem('userRole');
    },
  },
  getters: {
    getUserRole: (state) => state.userRole,
  },
});
