import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteTask } from './Api';

const TaskCard = ({ task, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      toast.success('Task deleted successfully!');
      onDelete(task.id);
    } catch (error) {
      toast.error('An error occurred while deleting the task');
    }
  };

  return (
    <div className="col-md-4 mb-3">
      <Card className="task-card">
        <Card.Body>
          <Card.Title>{task.name}</Card.Title>
          <small className="text-muted">Description: {' '}{task.description}</small>
          <Card.Text>
            <small className="text-muted">Due Date:{' '}{new Date(task.dueDate).toLocaleString()}</small>
          </Card.Text>
          <Card.Text>
            <small className="text-muted">Status: {' '}{task.status}</small>
          </Card.Text>
          <Link to={`/edit/${task.id}`} className="btn btn-primary me-2">Update</Link>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TaskCard;
