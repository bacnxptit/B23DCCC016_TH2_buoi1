import React from 'react';

import TodoApp from './component/todoList';
import ImageSearchApp from './component/searchImage';
import RandomColor from './component/randomColor';
const App = () => {
  return (
  
      <div>
      <TodoApp/>
      <ImageSearchApp/>
      <RandomColor/>
    </div>
  );
};

export default App;