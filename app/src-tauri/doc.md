# DOC 

## Gestions des comptes :


`insert_account(username, password)` : insert un compte dans la db, renvoie une erreur si le compte (login) existe déjà 

`is_password_correct(username, password)` : check si un couple username password existe, true si c'est vrai, faux si le couple n'existe pas


`adjust_elo_streak(username, elo)` : ajoute `elo` à l'elo actuel du joueur en mode streak

`adjust_elo_60(username, elo)` : ajoute `elo` à l'elo actuel du joueur en mode 60 secondes


## Gestions des mots :

`insert_words(word, mot)` : ajoute un `word` et sa traduction `mot` dans la database

`insert_words_from_file(file_path)` : ajoute la liste de mot de `file_path` dans la database

`adjust_elo_word(word, elo)` : ajoute `elo` à l'elo actuel du mot 
