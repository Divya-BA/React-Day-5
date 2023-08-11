import React, { useState } from 'react';

const Card = ({ todo, onDelete, onStatusChange, onEdit, onSave }) => {
  const [editedName, setEditedName] = useState(todo.name);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleSave = () => {
    onSave(editedName, editedDescription);
  };

  return (
    <div className='card'>
      <div className='card-body'>
        {todo.isEditing ? (
          <>
            <input
              type='text'
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <input
              type='text'
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <button className='save' onClick={handleSave}>
              Save
            </button>
          </>
        ) : (
          <>
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
            <p>
              Status:{' '}
              <select
                value={todo.status}
                onChange={(e) => onStatusChange(todo.id, e.target.value)}
              >
                <option value='Not Completed'>Not Completed</option>
                <option value='Completed'>Completed</option>
              </select>
            </p>
            <button className='edit' onClick={onEdit}>
              Edit
            </button>
            <button className='delete' onClick={() => onDelete(todo.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
