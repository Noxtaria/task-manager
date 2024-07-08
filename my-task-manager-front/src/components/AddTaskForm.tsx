import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import api from '../services/api';

interface AddTaskFormProps {
  onTaskAdded: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await api.post('/tasks', {
        title,
        description,
        completed: false,
      });

      setTitle('');
      setDescription('');
      onTaskAdded();
    } catch (error) {
      console.error('There was an error adding the task!', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </Box>
  );
};

export default AddTaskForm;
