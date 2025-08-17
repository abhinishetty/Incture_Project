import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    type: 'Feature',
    status: 'Pending',
  });

  useEffect(() => {
    const mockTasks = [
      { id: 1, title: 'Fix login bug', type: 'Bug', status: 'In Progress' },
      { id: 2, title: 'Add dashboard charts', type: 'Feature', status: 'Pending' },
      { id: 3, title: 'Improve performance', type: 'Improvement', status: 'Completed' },
    ];
    setTasks(mockTasks);
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTask.title) return toast.error('Task title cannot be empty!');
    const taskToAdd = { ...newTask, id: Date.now() };
    setTasks([...tasks, taskToAdd]);
    setNewTask({ title: '', type: 'Feature', status: 'Pending' });
    toast.success('Task added successfully!');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.warn('Task deleted!');
  };

  return (
    <div className="tasklist-container">
      <h2>Tasks</h2>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <select
          value={newTask.type}
          onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
        >
          <option value="Bug">Bug</option>
          <option value="Feature">Feature</option>
          <option value="Improvement">Improvement</option>
        </select>
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <div>
              <strong>{t.title}</strong> - <span>{t.type}</span> - <span>{t.status}</span>
            </div>
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default TaskList;
