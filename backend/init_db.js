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
        console.log('Creating tables...')
        let create_user = '\
        CREATE TABLE IF NOT EXISTS account (\
        username TEXT NOT NULL PRIMARY KEY,\
        password TEXT NOT NULL,\
        score_60_4 INTEGER,\
        score_60_guess INTEGER,\
        score_streak_4 INTEGER,\
        score_streak_guess INTEGER\
        )';
        let create_words = "\
        CREATE TABLE IF NOT EXISTS words (\
        word TEXT NOT NULL,\
        mot TEXT NOT NULL\
        )";
        
        db.run(create_user,
        (err) => {
            if (err) {
                // Table already created
            }else{

            }
        });
        db.run(create_words,
          (err) => {
              if (err) {
                  // Table already created
              }else{
                console.log('Inserting data into database...');
                // Read the data from data.txt
                fs.readFile('/app/database/data.txt', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    // Split the data into an array of words
                    const words = data.split('\n');
                    

                    // Insert each word into the words table
                    const insertWord = 'INSERT INTO words (word, mot) VALUES (?, ?)';
                    words.forEach((word) => {
                        let [mot,trad] = word.split(',');
                        mot = mot.trim();
                        trad = trad.trim();
                        db.run(insertWord, [trad, mot]);
                    });
                });
              }
          }); 
    }
    
  });


