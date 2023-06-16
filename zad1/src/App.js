import React, { useState } from "react";
import "./App.css"

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function addTask(event) {
    event.preventDefault();
    setTasks([
      ...tasks,
      {
        id: tasks.length,
        title: newTask,
        completed: false,
      },
    ]);
    setNewTask("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function editTask(id, newTitle) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className="task-list">
      <form className="task-form" onSubmit={addTask}>
        <input
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button type="submit">Dodaj zadanie</button>
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <input
              className="edit-button"
              value={task.title}
              onChange={(event) => editTask(task.id, event.target.value)}
            />
            <button className="delete-button" onClick={() => deleteTask(task.id)}>Usuń zadanie</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
