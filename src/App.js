import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from './components/TaskList';
import TaskCreateUpdate from './components/TaskCreateUpdate';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<TaskCreateUpdate />} />
          <Route path="/edit/:id" element={<TaskCreateUpdate />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
