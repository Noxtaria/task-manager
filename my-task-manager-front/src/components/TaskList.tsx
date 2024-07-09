import React, { useEffect, useState } from 'react';
import { Container, Typography, Alert } from '@mui/material';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import api from '../services/api';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface MongoTask {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = () => {
    api.get('/tasks')
      .then(response => {
        const tasks = response.data.map((task: MongoTask) => ({
          id: task._id,
          title: task.title,
          description: task.description,
          completed: task.completed,
        }));
        setTasks(tasks);
        setError(null);
      })
      .catch(() => {
        setError('There was an error fetching the tasks.');
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Task List
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <AddTaskForm onTaskAdded={fetchTasks} />
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))
      ) : (
        <Typography>No tasks available.</Typography>
      )}
    </Container>
  );
};

export default TaskList;
