const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuration
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock Database
const users = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane@example.com",
    avatar: "https://images.pexels.com/photo/1550129/pexels-photo-1550129.jpeg",
    friends: [2, 3]
  }
];

const posts = [
  {
    id: 1,
    userId: 1,
    content: "Just joined LinkHub!",
    timestamp: new Date().toISOString(),
    likes: 5,
    comments: []
  }
];

// API Endpoints
app.get('/api/current-user', (req, res) => {
  res.json(users[0]);
});

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    userId: 1,
    content: req.body.content,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: []
  };
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});