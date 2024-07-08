import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import api from '../services/api';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = () => {
    api.get('/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
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
