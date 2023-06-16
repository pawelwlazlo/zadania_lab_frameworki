import React, { useState, useEffect } from "react";
import {useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function TaskForm() {
  const { id } = useParams();
  const isEdit = id !== undefined;
  const [title, setTitle] = useState("");
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        const result = await axios.get(`http://localhost:3001/tasks/${id}`); 
        setTitle(result.data.title);
      }
    };
    fetchData();
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await axios.put(`http://localhost:3001/tasks/${id}`, { title }); 
    } else {
      await axios.post("http://localhost:3001/tasks", { title }); 
    }
    history.push("/");
  };

  return (
    <div className="container">
      <h1 className="header">{isEdit ? "Edytuj zadanie" : "Dodaj zadanie"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Tytuł:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <button type="submit">{isEdit ? "Zapisz" : "Dodaj"}</button>
      </form>
    </div>
  );
}

export default TaskForm;
