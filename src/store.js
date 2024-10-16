import { createStore, combineReducers } from 'redux';
const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { text: action.payload, completed: false }];
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        index === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'EDIT_TODO':
      return state.map((todo, index) =>
        index === action.payload.index ? { ...todo, text: action.payload.text } : todo
      );
    case 'DELETE_TODO':
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};
const imageSearchReducer = (state = { images: [], key: '' }, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return { ...state, images: action.payload };
    case 'SET_KEY':
      return { ...state, key: action.payload };
    default:
      return state;
  }
};
const randomColorReducer = (state = { color: '#ffffff', history: [] }, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {
        ...state,
        color: action.payload,
        history: [...state.history, action.payload],
      };
    case 'UNDO_COLOR':
      const newHistory = state.history.slice(0, -1);
      return {
        ...state,
        color: newHistory[newHistory.length - 1] || '#ffffff',
        history: newHistory,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  imageSearch: imageSearchReducer,
  todos: todoReducer,
  randomColor:randomColorReducer,
});

const store = createStore(rootReducer);

export default store;
