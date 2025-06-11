const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('WeatherNow CI/CD Pipeline Working ✅');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
