const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// Połączenie do bazy danych SQLite
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// Inicjalizacja tabeli
db.run('CREATE TABLE tasks(id INTEGER PRIMARY KEY, name TEXT, description TEXT, completed INTEGER)', [], (err) => {
  if(err) {
    return console.error(err.message);
  }
});

// Pobieranie wszystkich zadań
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if(err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message":"success",
      "data": rows
    })
  });
});

// Pobieranie jednego zadania
app.get('/tasks/:id', (req, res) => {
  db.get('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, row) => {
    if(err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message":"success",
      "data": row
    })
  });
});

// Dodawanie zadania
app.post('/tasks', (req, res) => {
  const data = [req.body.name, req.body.description, req.body.completed];
  db.run('INSERT INTO tasks (name, description, completed) VALUES (?, ?, ?)', data, function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": req.body,
      "id" : this.lastID
    })
  });
});

// Aktualizowanie zadania
app.put('/tasks/:id', (req, res) => {
  const data = [req.body.name, req.body.description, req.body.completed, req.params.id];
  db.run('UPDATE tasks SET name = ?, description = ?, completed = ? WHERE id = ?', data, function(err) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({
      message: "success",
      data: req.body,
      changes: this.changes
    })
  });
});

// Usuwanie zadania
app.delete('/tasks/:id', (req, res) => {
  db.run('DELETE FROM tasks WHERE id = ?', req.params.id, function(err) {
    if (err){
      res.status(400).json({"error": res.message})
      return;
    }
    res.json({
      message: "success",
      changes: this.changes
    })
  });
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
