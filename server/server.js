const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://vishwaksenpujala:DPXwAaBvCfUQCFpF@cluster0.02rif.mongodb.net/', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log('Connected to MongoDB')
});

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
