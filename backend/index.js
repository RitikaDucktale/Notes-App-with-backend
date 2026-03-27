require('dotenv').config();

const express = require('express');
const multer = require('multer');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use('/auth',authRoutes);
app.use('/notes',notesRoutes);
app.use('/user',userRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});

