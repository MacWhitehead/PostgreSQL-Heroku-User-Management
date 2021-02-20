//npm init 
//npm i pg express -y
//npm i dotenv -D 
//add "start": "node app.js", "dev": "node -r dotenv/config app.js ", under scripts in the package.json
//add port and database URL to .env

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
console.log(`App name: ${process.env.APP_NAME}`)
console.log(`App title: ${process.env.TITLE}`)
const db = require('./db')

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));

//api for client(browser)
app.get('/', db.getUsers)

// app.get('/createUser', (req, res) => {
//     req.send()
// })

app.post('/createUser', db.createUsers)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

//git init 
//git add . 
//git commit - m 'init code' 
//heroku git:remote -a calm-retreat-01688 adds your repository to your heroku 
//use remote link