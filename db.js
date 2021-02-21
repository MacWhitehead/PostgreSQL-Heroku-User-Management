const Pool = require("pg").Pool;
const url = require("url");
const DBConnectionString = process.env.DATABASE_URL;

const params = url.parse(DBConnectionString);

const auth = params.auth.split(":");
if (params.hostname === "localhost") {
  SSL = false;
} else {
  SSL = { rejectUnauthorized: false };
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
  let getUsersSQL = "select * from users order by id asc limit 10";
  pool.query(getUsersSQL, (error, results) => {
    if (error) {
      throw error;
    }
    res.render("index", { users: results.rows });
  });
};

const createUsers = (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const age = req.body.age;
  let addUserSQL =
    "insert into users (first_name, last_name, email, age) values ($1, $2, $3, $4);";
  pool.query(
    addUserSQL,
    [first_name, last_name, email, age],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.redirect("/");
    }
  );
};

const updateUser = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  console.log(`db getUsers`);
  let updateUserSQL = `update users set name = ${name} where id is ${id};`;
  pool.query(updateUserSQL, [name, id], (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
    res.status(200).json(results);
  });
};

module.exports = {
  getUsers,
  createUsers,
  updateUser,
};
