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
// define the about route
router.get('/index', (req, res) => {
    res.sendFile(__dirname + '/template/index.html');
})

module.exports = router;