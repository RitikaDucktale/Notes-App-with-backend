const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())
app.use('/auth',authRoutes);
app.use('/',notesRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});

