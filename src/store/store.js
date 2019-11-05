import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    login : 'empty',
  },
  getters: {
    LOGIN : state => {
      return state.login
    },
  },
  mutations: {
    SET_LOGIN : (state, payload) => {
      state.login = payload
    },
  },
  actions: {},
});
