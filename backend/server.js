const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const Router = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,HEAD,PUT,PATCH,DELETE",
  credentials: true
}));

app.use(express.json()); 

connectDB();

app.use('/api/users', Router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
