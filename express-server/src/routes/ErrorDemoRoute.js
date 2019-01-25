// Import dependencies
const express = require('express');
const router = express.Router();

router.get('/500', (req, res) => {
  res.status(500).send('Internal Server Error');
})
router.get('/401', (req, res) => {
  res.status(401).send('Unauthorized');
})
router.get('/403', (req, res) => {
  res.status(403).send('Forbidden');
})
router.get('/404', (req, res) => {
  res.status(404).send('Not Found');
})

module.exports = router;