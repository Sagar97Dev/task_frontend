import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTask, getTaskById, updateTask } from './Api';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskCreateUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      dueDate: '',
      status: 'CREATED',
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await getTaskById(id);
          const taskData = response.data.task;
          taskData.dueDate = formatDate(taskData.dueDate);
          reset(taskData);
        } catch (error) {
          toast.error('An error occurred while fetching the task');
        }
      };
      fetchTask();
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await updateTask(id, data);
        toast.success('Task updated successfully!');
      } else {
        await createTask(data);
        toast.success('Task created successfully!');
      }
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred while saving the task';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">{id ? 'Update Task' : 'Create Task'}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">Due Date</label>
              <input
                className="form-control"
                type="datetime-local"
                {...register('dueDate', { required: 'Due date is required' })}
              />
              {errors.dueDate && <p className="text-danger">{errors.dueDate.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {id ? 'Update' : 'Create'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskCreateUpdate;
