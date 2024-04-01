const express = require('express');
const { cp } = require('fs');
const path = require('path');
const app = express();

const sqlite3 = require('sqlite3');
const DBSOURCE = "/app/db/database.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  }else{
      console.log('Connected to the SQLite database.')
  }
});
module.exports = db;


app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});


app.get('/api/getWords4/:N', (req, res) => {
  let sql = "SELECT * FROM words ORDER BY RANDOM() LIMIT ?";
  let N = req.params.N;
  let params = [N];
  db.all(sql,params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    db.all("SELECT mot FROM words LIMIT ?",[N*3], (err, data) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      let result = [];
      for (let i = 0; i < N; i++) {
        let temp = [];
        temp.push(rows[i]["word"]);
        temp.push(rows[i]["mot"]);
        temp.push(data[3*i]["mot"]);
        temp.push(data[3*i+1]["mot"]);
        temp.push(data[3*i+2]["mot"]);
        result.push(temp);
      }
      res.json(result);

    });
  });
});


app.get('/api/getWordsGuess/:N', (req, res) => {
  let sql = "SELECT word,mot FROM words ORDER BY RANDOM() LIMIT ?";
  let N = req.params.N;
  let params = [N];
  db.all(sql,params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json(rows);
  });
});

app.get('/api/login/:username/:password', (req, res) => {
  let sql = "SELECT COUNT(*) as nbr FROM account WHERE username = ? AND password = ?";
  let username = req.params.username;
  let password = req.params.password;
  let params = [username, password];
  db.all(sql,params, (err, rows) => {
    if (err) {
      res.json(false);
    }
    else{
      if (rows[0]["nbr"]== 0) {
        res.json(false);
      }
      else{
          res.json(true);
        }
    }
  });
});

app.get('/api/register/:username/:password', (req, res) => {
  let username = req.params.username;
  let password = req.params.password;

  // Vérifier si le nom d'utilisateur existe déjà
  db.get("SELECT COUNT(*) AS count FROM account WHERE username = ?", [username], (err, row) => {
    if (err) {
      res.status(500).json({"error": err.message});
      return;
    }

    // Si le nom d'utilisateur existe déjà, renvoyer false
    if (row.count > 0) {
      res.json(false);
      return;
    }

    // Si le nom d'utilisateur n'existe pas, insérer le nouvel utilisateur
    let sql = "INSERT INTO account (username, password, elo_60, elo_streak) VALUES (?, ?, 0, 0)";
    let params = [username, password];
    
    db.run(sql, params, (err) => {
      if (err) {
        res.status(500).json({"error": err.message});
        return;
      }
      // Envoyer true pour indiquer que l'inscription a réussi
      res.json(true);
    });
  });
});


app.get('/api/getLeaderbord60/:N', (req, res) => {
  let sql = "SELECT username, elo_60 FROM account ORDER BY elo_60 DESC LIMIT ?";
  let N = req.params.N;
  let params = [N];
  db.all(sql,params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json(rows);
  });
});

app.get('/api/getLeaderbordStreak/:N', (req, res) => {
  let sql = "SELECT username, elo_streak FROM account ORDER BY elo_streak DESC LIMIT ?";
  let N = req.params.N;
  let params = [N];
  db.all(sql,params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json(rows);
  });
});


app.get('/api/updateElo60/:username/:elo', (req, res) => {
  let sql = "UPDATE account SET elo_60 = elo_60 + ? WHERE username = ?";
  let username = req.params.username;
  let elo = req.params.elo;

  let params = [elo, username];
  db.run(sql,params, (err) => {
    if (err) {
      res.json(false);
    }
    res.json(true);
  });
});

app.get('/api/updateEloStreak/:username/:elo', (req, res) => {
  let sql = "UPDATE account SET elo_streak = elo_streak + ? WHERE username = ?";
  let username = req.params.username;
  let elo = req.params.elo;

  let params = [elo, username];
  db.run(sql,params, (err) => {
    if (err) {
      res.json(false);
    }
    res.json(true);
  });
});



app.listen(3002, () => {
  console.log('Server is running on port 3002');
});


