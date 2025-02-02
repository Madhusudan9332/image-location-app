const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/imageLocations', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define Location Schema
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  imageName: String,
  timestamp: { type: Date, default: Date.now }
});

const Location = mongoose.model('Location', locationSchema);

// API Endpoint to Save Location
app.post('/api/locations', async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    await newLocation.save();
    res.status(201).json({ message: 'Location saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving location' });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
