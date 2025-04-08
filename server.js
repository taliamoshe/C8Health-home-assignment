require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const config = require('./config/config'); 
const KnowledgeRoutes = require('./routes/knowledgeRoutes');
app.use('/home_assigment', KnowledgeRoutes);

const generateSampleData = require('./generateSampleData'); // Adjust the path as needed
const { sequelize } =  require('./models'); // Import sequelize to sync the database

async function startUp() {
    try {
      console.log('Connecting to DB...');
      await sequelize.sync({ force: false });
  
      // Generate sample data after the database is ready
      console.log('Generating sample data...');
      await generateSampleData(); // Function to create data
  
      console.log('Sample data generated successfully!');
    } catch (error) {
      console.error('Error during startup:', error.message);
    }
  }
  
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  await startUp(); // Generate sample data when the server starts
});
