const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
    let dt = new Date().toLocaleString();
    console.log('Time: ', dt);
    next();
})
// define the home page route
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/template/main.html');
})

// define the beauty route
router.get('/beauty', (req, res) => {
    res.sendFile(__dirname + '/template/beauty.html');
})

// define the gradient background route
router.get('/background', (req, res) => {
    res.sendFile(__dirname + '/template/background.html');
})

// define the drop route
router.get('/drop', (req, res) => {
    res.sendFile(__dirname + '/template/drop.html');
})

// define the chat route
router.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/template/chat.html');
})

// define the arduino route
router.get('/arduino', (req, res) => {
    res.sendFile(__dirname + '/template/arduino.html');
})

// define the about route
router.get('/about', (req, res) => {
    res.sendFile(__dirname + '/template/about.html');
})

// define the parallax route
router.get('/parallax', (req, res) => {
    res.sendFile(__dirname + '/template/parallax_demo.html');
})

// define the profile route
router.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/template/profile.html');
})
module.exports = router;