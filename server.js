const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
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

// Blog route: Read and serve blog posts dynamically
app.get('/blog', (req, res) => {
  // Read the posts.json file
  fs.readFile(path.join(__dirname, 'data', 'posts.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading posts data.');
    }

    // Parse the JSON data
    const posts = JSON.parse(data);

    // Use EJS to render the blog page (or send plain HTML if you're not using a view engine)
    res.render('blog', { posts }); // You need to create the blog.ejs file in the 'views' folder
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
