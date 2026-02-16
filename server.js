const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine (if you're using EJS, otherwise skip this part)
app.set('view engine', 'ejs');

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// About route
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Contact route
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Blog route: Read the posts from the JSON file and send them as JSON
app.get('/blog', (req, res) => {
  // Read the posts.json file
  fs.readFile(path.join(__dirname, 'data', 'posts.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading posts data.');
    }

    const posts = JSON.parse(data);  // Parse the JSON data
    res.json(posts);  // Send the posts data as JSON response
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
