import React, { useEffect, useState } from 'react';
import api from './axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', status: 'Pending' });

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create project
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/projects', newProject);
      setProjects(prev => [...prev, res.data]);
      setNewProject({ name: '', status: 'Pending' });
    } catch (err) {
      console.error(err);
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Projects</h2>

      {/* New Project Form */}
      <form onSubmit={handleCreate} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Project Name"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <select
          value={newProject.status}
          onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Add</button>
      </form>

      {/* Project List */}
      <ul>
        {projects.map(p => (
          <li key={p.id} className="border p-2 rounded mb-2 flex justify-between items-center">
            <div>
              <strong>{p.name}</strong> - <span>{p.status}</span>
            </div>
            <button
              onClick={() => handleDelete(p.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
