import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [newTodoName, setNewTodoName] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handleAddTodo = () => {
    if (newTodoName.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      name: newTodoName,
      description: newTodoDescription,
      status: 'Not Completed',
    };

    if (editingTodoId !== null) {
      const updatedTodos = todos.filter((todo) => todo.id !== editingTodoId);
      setTodos([...updatedTodos, newTodo]);
      setEditingTodoId(null);
    } else {
      setTodos([...todos, newTodo]);
    }

    setNewTodoName('');
    setNewTodoDescription('');
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTodo = (todo) => {
    setEditingTodoId(todo.id);
    setNewTodoName(todo.name);
    setNewTodoDescription(todo.description);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    return todo.status === filter;
  });

  return (
    <div className='container'>
      <h1 className='head'>My Todo</h1>
      <div>
        <input
          type='text'
          placeholder='Todo Name'
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Todo Description'
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
        />
        <button onClick={handleAddTodo}>
          {editingTodoId !== null ? 'Save Edit' : 'Add Todo'}
        </button>
      </div>
      <div className='row'>
        <div className='col-lg-6'>
          <h2 className='head1'>My Todos</h2>
        </div>
        <div className='col-lg-6' id='dropdown'>
          <label htmlFor='status'>Status Filter:</label>
          <select id='status' onChange={(e) => setFilter(e.target.value)}>
            <option value='All'>All</option>
            <option value='Completed'>Completed</option>
            <option value='Not Completed'>Not Completed</option>
          </select>
        </div>
      </div>
      <div className='flex'>
        {filteredTodos.map((todo) => (
          <div className='card' key={todo.id}>
            <div className='card-body'>
              <h3>{todo.name}</h3>
              <p>{todo.description}</p>
              <p>
                Status:{' '}
                <select
                  value={todo.status}
                  onChange={(e) => handleStatusChange(todo.id, e.target.value)}
                >
                  <option value='Not Completed'>Not Completed</option>
                  <option value='Completed'>Completed</option>
                </select>
              </p>
              <button className='edit' onClick={() => handleEditTodo(todo)}>
                Edit
              </button>
              <button
                className='delete'
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
