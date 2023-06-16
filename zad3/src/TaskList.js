import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3001/tasks"); 
      setTasks(result.data);
    };
    fetchData();
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`); 
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <h1>Zadania</h1>
      {tasks.map((task) => (
        <div className="task-list" key={task.id}>
          <Link to={`/edit/${task.id}`}>{task.title}</Link>
          <button onClick={() => deleteTask(task.id)}>Usuń</button>
        </div>
      ))}
      <Link to="/create">Dodaj zadanie</Link>
    </div>
  );
}

export default TaskList;
