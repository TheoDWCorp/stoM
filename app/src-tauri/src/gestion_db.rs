pub mod gestion_db{
    use std::io;
    use rusqlite::{Connection};
    use std::io::BufRead;

    const DATABASE_NAME: &str = "my_database.db";

    pub fn initialize_database() -> io::Result<()> {
        let conn = Connection::open(DATABASE_NAME).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        conn.execute(
            "CREATE TABLE IF NOT EXISTS account (
                username TEXT NOT NULL PRIMARY KEY,
                password TEXT NOT NULL,
                elo_60 INTEGER,
                elo_streak INTEGER
            )",
            [],
        ).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;

        conn.execute(
            "CREATE TABLE IF NOT EXISTS words (
                word TEXT NOT NULL,
                mot TEXT NOT NULL,
                elo INTEGER
            )",
            [],
        ).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        Ok(())
    }

    pub fn insert_account(username: &str, password: &str) -> io::Result<()> {
        let conn = Connection::open(DATABASE_NAME).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        conn.execute(
            "INSERT INTO account (username, password, elo_60, elo_streak) VALUES (?1, ?2, 0, 0)",
            &[&username, &password],
        ).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        Ok(())
    }

    pub fn insert_words(word: &str, mot: &str) -> io::Result<()> {
        let conn = Connection::open(DATABASE_NAME).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        conn.execute(
            "INSERT INTO words (word, mot, elo) VALUES (?1, ?2, 0)",
            &[&word, &mot],
        ).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        Ok(())
    }

    pub fn get_account_data() -> io::Result<String> {
        let conn = Connection::open(DATABASE_NAME).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        let mut stmt = conn.prepare("SELECT * FROM account").map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        let rows = stmt.query_map([], |row| {
            // Access individual columns from the row and format them
            let username: String = row.get(0)?;  // Assuming username is the first column
            let password: String = row.get(1)?;  // Assuming password is the second column
            let elo_60: i64 = row.get(2)?;       // Assuming elo_60 is the third column
            let elo_streak: i64 = row.get(3)?;   // Assuming elo_streak is the fourth column
    
            // Format the row data into a readable format
            Ok(format!("Username: {}, Password: {}, Elo_60: {}, Elo_streak: {}", username, password, elo_60, elo_streak))
        }).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
    
        // Collect the row strings into a single string
        let mut result = String::new();
        for row in rows {
            result.push_str(&row.map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?);
            result.push('\n');
        }
    
        Ok(result)
    }
    pub fn get_words_data() -> io::Result<String> {
        let conn = Connection::open(DATABASE_NAME).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        let mut stmt = conn.prepare("SELECT * FROM words").map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        let rows = stmt.query_map([], |row| {
            // Access individual columns from the row and format them
            let word: String = row.get(0)?;  
            let mot: String = row.get(1)?;  
            let elo: i64 = row.get(2)?;       
    
            Ok(format!("word: {}, mot: {}, Elo: {}", word, mot, elo))
        }).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
    
        // Collect the row strings into a single string
        let mut result = String::new();
        for row in rows {
            result.push_str(&row.map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?);
            result.push('\n');
        }
    
        Ok(result)
    }

    pub fn is_password_correct(username: &str, password: &str) -> io::Result<bool> {
        let conn = Connection::open(DATABASE_NAME).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        let mut stmt = conn.prepare("SELECT * FROM account WHERE username = ?1 AND password = ?2").map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        let rows = stmt.query_map(&[&username, &password], |_| Ok(true)).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        let mut result = false;
        for _ in rows {
            result = true;
        }
        Ok(result)
    }

    pub fn adjust_elo_streak(username: &str, elo: i64) -> io::Result<()> {
        let conn = Connection::open(DATABASE_NAME).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        conn.execute(
            "UPDATE account SET elo_streak = elo_streak + ?1 WHERE username = ?2",
            [elo.to_string(), username.to_string()],
        ).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        Ok(())
    }

    pub fn adjsust_elo_60(username: &str, elo: i64) -> io::Result<()> {
        let conn = Connection::open(DATABASE_NAME).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        conn.execute(
            "UPDATE account SET elo_60 = elo_60 + ?1 WHERE username = ?2",
            [elo.to_string(), username.to_string()],
        ).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        Ok(())
    }

    pub fn adjust_elo_word(word: &str, elo: i64) -> io::Result<()> {
        let conn = Connection::open(DATABASE_NAME).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        conn.execute(
            "UPDATE words SET elo = elo + ?1 WHERE word = ?2",
            [elo.to_string(), word.to_string()],
        ).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        Ok(())
    }
    pub fn  count_rows_in_words() -> io::Result<i64> {
        let conn = Connection::open(DATABASE_NAME).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        let query = format!("SELECT COUNT(*) FROM words");
        let count: i64 = conn.query_row(&query, [], |row| row.get(0)).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        Ok(count)
    }
    
    pub fn select_n_words(n: i64) -> io::Result<Vec<String>> {
        let conn = Connection::open(DATABASE_NAME).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        let query = format!("SELECT word,mot,elo FROM words ORDER BY RANDOM() LIMIT {}", n);
        let mut stmt = conn.prepare(&query).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;;
        let rows = stmt.query_map([], |row| {
            // Access individual columns from the row and format them
            let word: String = row.get(0)?;  
            let mot: String = row.get(1)?;  
            let elo: i64 = row.get(2)?;       
    
            Ok(format!("word: {}, mot: {}, Elo: {}", word, mot, elo))
        }).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
    
        // Collect the row strings into a vector
        let mut result = Vec::new();
        for row in rows {
            result.push(row.map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?);
        }
    
        Ok(result)
    }

    pub fn insert_words_from_file(file_path: &str) -> io::Result<()> {
        let conn = Connection::open(DATABASE_NAME).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
    
        let mut file = std::fs::File::open(file_path)?;
        let reader = std::io::BufReader::new(file);
    
        for line in reader.lines() {
            let line = line?;
            let parts: Vec<&str> = line.split(',').collect();
            if parts.len() != 2 {
                println!("Skipping line: {}", line);
                continue;
            }
            let word = parts[0].trim();
            let mot = parts[1].trim();
    
            conn.execute(
                "INSERT INTO words (word, mot, elo) VALUES (?1, ?2, 0)",
                &[mot, word],
            ).map_err(|err| io::Error::new(io::ErrorKind::Other, err.to_string()))?;
        }
    
        Ok(())
    }
}

