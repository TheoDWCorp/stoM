const sqlite3 = require('sqlite3');
const fs = require('fs');
const DBSOURCE = "/app/db/database.sqlite";

console.log('Initializing database...');
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        let create_user = '\
        CREATE TABLE IF NOT EXISTS account (\
        username TEXT NOT NULL PRIMARY KEY,\
        password TEXT NOT NULL,\
        elo_60 INTEGER,\
        elo_streak INTEGER\
        )';
        let create_words = "\
        CREATE TABLE IF NOT EXISTS words (\
        word TEXT NOT NULL,\
        mot TEXT NOT NULL,\
        elo INTEGER\
        )";
        
        db.run(create_user,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                /*
                let insert = 'INSERT INTO account (username, password, elo_60, elo_streak) VALUES (?,?,0,0)';
                db.run(insert, ["admin","admin"])
                db.run(insert, ["ekip","ekip"])
                */
            }
        });
        db.run(create_words,
          (err) => {
              if (err) {
                  // Table already created
              }else{
  
              }
          }); 
    }
  });


// Read the data from data.txt
fs.readFile('/home/to/wd/stoM/database/data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Split the data into an array of words
    const words = data.split('\n');
    

    // Insert each word into the words table
    const insertWord = 'INSERT INTO words (word, mot, elo) VALUES (?, ?, 0)';
    words.forEach((word) => {
        let [mot,trad] = word.split(',');
        mot = mot.trim();
        trad = trad.trim();
        db.run(insertWord, [trad, mot]);
    });
});