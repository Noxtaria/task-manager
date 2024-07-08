import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import api from '../services/api';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get(`/tasks/${id}`)
      .then(response => {
        setTask(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the task details!', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!task) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Task not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Task Detail
      </Typography>
      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {task.description}
          </Typography>
          <Typography variant="body2" color={task.completed ? 'success.main' : 'error.main'}>
            {task.completed ? (
              <>
                <CheckCircleIcon fontSize="small" /> Completed
              </>
            ) : (
              <>
                <PendingIcon fontSize="small" /> Pending
              </>
            )}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TaskDetail;
