const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db')

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));

app.get('/', db.getUsers)

app.post('/createUser', db.createUsers)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})