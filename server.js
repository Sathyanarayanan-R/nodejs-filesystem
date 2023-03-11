const express = require('express');
require('dotenv').config();
const fileRoute = require('./routes/file');

const app = express();

const port = process.env.PORT || 1509;

app.use("/api/files", fileRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
