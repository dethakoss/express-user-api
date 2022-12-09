import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'usersapi'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('mysql connected!');
});

export const getUsers = (req, res) => {
connection.query("SELECT * FROM users;", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
}

export const createUser = (req, res) => {   
    const user = req.body;
    console.log(user);
    var sql = "INSERT INTO users (name, id) VALUES ('"+user.user+"', '"+genid(50)+"')";
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(200);
      });
    console.log(`User [${user.user}] added to the database.`);
};

export const getUser = (req, res) => {
    connection.query("SELECT * FROM users WHERE id = '"+req.params.id+"'", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
};

export const deleteUser = (req, res) => { 
    connection.query("DELETE FROM users WHERE id = '"+req.params.id+"'", function (err, result, fields) {
        if (err) throw err;
        console.log(`user with id ${req.params.id} has been deleted`);
        res.send(200);
      });
    };

export const updateUser =  (req, res) => {
    connection.query("SELECT name FROM users WHERE id = '"+req.params.id+"'", function (err, rows) {
        if (err) throw err;
        const name = rows[0].name
        var sql = "UPDATE users SET name = '"+req.body.user+"' WHERE id = '"+req.params.id+"';"
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(`user with id: ${req.params.id} updated ${name} --> ${req.body.user}`)
            res.send(200);
          });
      });
};
export const genid = (num) => {
    var result           = '';
    var c       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz0123456789-';
    var cL = c.length;
    for ( var i = 0; i < num; i++ ) {
        result += c.charAt(Math.floor(Math.random() * cL));
    }
    return result;
    }
