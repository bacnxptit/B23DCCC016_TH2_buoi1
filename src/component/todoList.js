import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const TodoItem = ({ todo, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(todo.text);

  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <input type="checkbox" onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: index })} />
        {!isEditing ? (
          <div>{todo.text}</div>
        ) : (
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        )}
        <div>
          <button onClick={() => {
            if (isEditing) {
              dispatch({ type: 'EDIT_TODO', payload: { index, text: inputValue } });
            }
            setIsEditing(!isEditing);
          }}>
            {isEditing ? 'Lưu lại' : 'Chỉnh sửa'}
          </button>
          <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: index })}>Xóa</button>
        </div>
      </div>
    </li>
  );
};

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} />
      ))}
    </ul>
  );
};

const TodoApp = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  return (
    <div style={{ margin: 24, width: 500, paddingRight: 24, height: 500, border: '3px solid #ccc' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Todo List</h1>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nội dung công việc"
        />
        <button onClick={addTodo}>Thêm</button>
      </div>
      <TodoList />
    </div>
  );
};

export default TodoApp;