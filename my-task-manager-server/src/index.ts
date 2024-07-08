import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Task 1', description: 'Description 1', completed: false },
  { id: 2, title: 'Task 2', description: 'Description 2', completed: true },
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  console.log(`Requested task ID: ${req.params.id}, Found task: ${task}`); // Log for debugging
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.post('/api/tasks', (req, res) => {
  const newTask = { ...req.body, id: tasks.length + 1 };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
