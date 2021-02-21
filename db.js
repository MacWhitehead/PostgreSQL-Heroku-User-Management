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

const editUserPage = (req, res) => {
  const id = req.params.id;
  let pullUserInfo = "select * from users where id = $1";
  pool.query(pullUserInfo, [id], (err, results) => {
    if (err) throw err;
    res.render("editUser", { user: results.rows[0] });
  });
};

const updateUser = (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const age = req.body.age;
  const id = req.params.id;
  let updateUserSQL =
    "update users set first_name = $1, last_name = $2, email = $3, age = $4 where id = $5";
  pool.query(
    updateUserSQL,
    [first_name, last_name, email, age, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.redirect("/");
    }
  );
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  let deleteUserSQL = "delete from users where id = $1";
  pool.query(deleteUserSQL, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.redirect("/");
  });
};

const searchByFirst = (req, res) => {
  const searched = req.body.searchByFirst;
  let searchFirstSQL = 'select * from users where first_name = $1'
  pool.query(searchFirstSQL, [searched], (error, results) => {
    if (error) throw error;
    res.render("index", { users: results.rows });
  })
}

const searchByLast = (req, res) => {
  const searched = req.body.searchByLast;
  let searchLastSQL = 'select * from users where last_name = $1'
  pool.query(searchLastSQL, [searched], (error, results) => {
    if (error) throw error;
    res.render("index", { users: results.rows });
  })
}

module.exports = {
  getUsers,
  createUsers,
  updateUser,
  editUserPage,
  deleteUser,
  searchByFirst,
  searchByLast
};
