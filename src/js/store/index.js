import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const types = {
  TODOS: "TODOS"
};

const rootStore = {
  state: {
    todos: {
      completed: false,
      content: ''
    }
  },
  getters: {
    getToDos: state => state.todos
  },
  actions: {
    setToDos({ commit }, data) {
      commit(types.TODOS, status)
    }
  },
  mutations: {
    [types.TODOS](state, data) {
      state.todos = {
        ...todos
      };
    }
  }
};

export default new Vuex.Store({
  ...rootStore,
  modules: {
    ui
  },
  strict: false
})
