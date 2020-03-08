import Vue from "vue";
import Vuex, {
  Module,
  ActionTree,
  GetterTree,
  MutationTree
} from "vuex";

Vue.use(Vuex);

interface RootState {}

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface TodoState {
  todos: Todo[];
  nextTodoId: number;
}

const initialState: TodoState = {
  todos: [{ id: 0, text: "サンプルTODO", done: false }],
  nextTodoId: 1
};

const getters: GetterTree<TodoState, RootState> = {
  completed: (state: TodoState): Todo[] => {
    return state.todos.filter(todo => todo.done === true);
  },
  incomplete: (state: TodoState): Todo[] => {
    return state.todos.filter(todo => todo.done === false);
  }
};

const mutations: MutationTree<TodoState> = {
  add: (state, text: string) => {
    return state.todos.push({ id: state.nextTodoId, text: text, done: false });
  },
  toggle: (state, id: number) => {
    return state.todos.map(todo => {
      if (todo.id !== id) {
        return todo;
      }
      return {
        ...todo,
        done: !todo.done
      };
    });
  },
  remove: (state, id: number) => {
    return state.todos.filter(todo => todo.id !== id);
  }
};

const actions: ActionTree<TodoState, RootState> = {};

const todoModule: Module<TodoState, RootState> = {
  namespaced: true,
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions
};

export default new Vuex.Store<RootState>({
  modules: {
    todoModule
  }
});
