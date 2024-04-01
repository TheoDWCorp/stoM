# détails des routes de l'app

"/" : route du front

"/api/getWords4/:N" : récupère N couples trad/mot et 3 autres propositions

"/api/getWordsGuess/:N" : récupère N couples trad/mot

"/api/login/:username/:password" : vérifie si le couple username/password est correct

"/api/register/:username/:password" : enregistre un nouvel utilisateur

"/api/getLeaderbord60/:N" : récupère les N meilleurs scores de 60 sec

"/api/getLeaderbordStreak/:N" : récupère les N meilleurs scores de streak

"/api/updateElo60/:username/:elo" : met à jour le score de l'utilisateur (+elo)

"/api/updateEloStreak/:username/:elo" : met à jour le score de l'utilisateur (+elo)

