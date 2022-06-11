const express = require ('express');
const app = express();
const port = process.env.PORT || 5000;
const router = require('./api/routes.js');

app.use(express.static('public'));
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});