const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db')

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));

app.get('/', db.getUsers)

app.get('/addUser', (req, res) => {
    res.render('addUser')
})

app.get("/editUser/:id", db.editUserPage);

app.post('/createUser', db.createUsers);

app.post('/userEdited/:id', db.updateUser);

app.post('/delete/:id', db.deleteUser)

app.post('/searchByFirst', db.searchByFirst)

app.post('/searchByLast', db.searchByLast)

app.post('/sortAsc', db.sortAsc)

app.post('/sortDesc', db.sortDesc)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})