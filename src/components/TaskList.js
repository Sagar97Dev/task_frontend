import React, { useEffect, useState } from 'react';
import { getTasks } from './Api';
import TaskCard from '../components/TaskCard';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks();
      setTasks(response.data.tasks);
    };
    fetchTasks();
  }, []);

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="card-title text-center w-100">Task List</h2>
            <Link to="/create">
              <Button variant="primary">Create</Button>
            </Link>
          </div>
          {tasks.length === 0 ? (
            <p>No Tasks available.</p>
          ) : (
            <div className="row">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
