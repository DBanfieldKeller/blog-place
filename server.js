const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');

app.get("", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Now Listening at port ${PORT}` )
})