const Pool = require("pg").Pool;
const url = require("url");
const DBConnectionString = process.env.DATABASE_URL;

const params = url.parse(DBConnectionString);

const auth = params.auth.split(":");
let SSL = process.env.SSL || { rejectUnauthorized: false };
if ((SSL = "false")) {
  SSL = false;
}

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
  ssl: true,
};
console.log(config);

const pool = new Pool(config);
const getUsers = (req, res) => {
  console.log(`db getUsers`);
  let getUsersSQL = "select * from users order by id asc limit 10";
  pool.query(getUsersSQL, (error, results) => {
    if (error) {
      throw error;
    }
    res.render('index', results)
  });
};

const createUsers = (req, res) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email;
    const gender = req.body.gender;
    const title = req.body.title 
    const age = req.body.age
    let addUserSQL = `insert into users (first_name, last_name, email, gender, title, age) values (${first_name}, ${last_name}, ${email}, ${gender}, ${title}, ${age});`
    pool.query(addUserSQL,[first_name, last_name, email, gender, title, age], (error, results) => {
      if (error) {
        throw error;
      }
      res.render('index', results)
    });
  };

  const updateUser = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    console.log(`db getUsers`);
    let updateUserSQL = `update users set name = ${name} where id is ${id};`
    pool.query(updateUserSQL,[name, id], (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results)
      res.status(200).json(results);
    });
  };

module.exports = {
    getUsers,
    createUsers, 
    updateUser
}