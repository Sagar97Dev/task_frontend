import React, { useEffect, useState } from 'react';
import { getTasks } from './Api';
import TaskCard from './TaskCard';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const tasksPerPage = 5;

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks();
      setTasks(response.data.tasks);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter(task =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(0); // Reset the current page to 0 when search term changes
  }, [searchTerm, tasks]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const offset = currentPage * tasksPerPage;
  const currentTasks = filteredTasks.slice(offset, offset + tasksPerPage);

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
          <Form className="my-3">
            <Form.Control
              type="text"
              placeholder="Search tasks"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
          {currentTasks.length === 0 ? (
            <p>No Tasks available.</p>
          ) : (
            <div className="row">
              {currentTasks.map(task => (
                <TaskCard key={task.id} task={task} onDelete={handleDelete} />
              ))}
            </div>
          )}
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={'<<'}
              nextLabel={'>>'}
              breakLabel={'...'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              pageCount={Math.ceil(filteredTasks.length / tasksPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
