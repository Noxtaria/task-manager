import React from 'react';
import { Card, CardContent, Typography, Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  };
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2, p: 2 }} key={task.id}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            {task.completed ? (
              <CheckCircleIcon color="success" />
            ) : (
              <PendingIcon color="error" />
            )}
          </Grid>
          <Grid item xs>
            <Typography variant="h5" component="div">
              <Link component={RouterLink} to={`/task/${task.id}`}>
                {task.title}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
            <Typography variant="body2" color={task.completed ? 'success.main' : 'error.main'}>
              {task.completed ? 'Completed' : 'Pending'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
