require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const KnowledgeRoutes = require('./routes/KnowledgeRoutes');
app.use('/hometask', KnowledgeRoutes);

app.listen(3000, () => console.log('Server Started'));
