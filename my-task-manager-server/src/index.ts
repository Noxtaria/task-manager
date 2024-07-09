import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import taskRoutes from './routes/taskRoutes';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
