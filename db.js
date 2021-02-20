//API to database file
const Pool = require("pg").Pool;
//pools allow you to handle more connections at one time.
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
  ssl: SSL,
};
console.log(config);

const pool = new Pool(config);
const getUsers = (req, res) => {
  console.log(`db getUsers`);
  let getUsersSQL = "select * from users order by id asc";
  pool.query(getUsersSQL, (error, results) => {
    if (error) {
      throw error;
    }
    res.render('index', {users: results})
  });
};

const createUsers = (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    console.log(`db getUsers`);
    let addUserSQL = `insert into users (email, name) values (${email}, ${name});`
    pool.query(addUserSQL,[email, name], (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results)
      res.status(200).json(results);
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