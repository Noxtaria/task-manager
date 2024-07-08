import React from 'react';
import TaskList from '../components/TaskList';
import { Container, Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Home Page
      </Typography>
      <TaskList />
    </Container>
  );
};

export default Home;
