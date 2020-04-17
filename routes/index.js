var express = require('express');
var router = express.Router();

// liste des titres à afficher en frontend
var musicList = [
  {type: 'pop', title: 'Wannabe', artist:'Spice Girls' , year: 1996 },
  {type: 'pop', title: 'Thriller', artist:'Michael Jackson' , year: 1983 },
  {type: 'rock', title: 'God Save the Queen', artist:'The Sex Pistols' , year: 1977 },
  {type: 'R&B', title: 'Be with you', artist:'Mary J. Blige' , year: 2005 },
  {type: 'pop', title: 'Shape of you', artist:'Ed Sheeran' , year: 2017 },
  {type: 'rock', title: 'Shockwave', artist:'Liam Gallagher' , year: 2017 },
  {type: 'R&B', title: 'Empire State of Mind', artist:'Alicia Keys' , year: 2009 },
  {type: 'rock', title: 'Numb', artist:'Linkin Park' , year: 2003 },
  {type: 'R&B', title: 'Shut up', artist:'The Black Eyed Peas' , year: 2009 }
];

// initialisation d'une variable globale utilisée pour le filtre des styles de musiques
var musicFilter;
// initialisation d'une variable globale à false pour le tri croissant/décroissant des titres
var onSortClick = false;

// route de la page d'accueil
router.get('/', function(req, res, next) {
  musicFilter = null;
  if (req.session.myPlaylist === undefined) {
    req.session.myPlaylist = []
  }
  res.render('index', {musicList, onSortClick});
});

// route de la playlist
router.get('/my-playlist', function(req, res, next) {
  res.render('playlist', {myPlaylist: req.session.myPlaylist});
});

// route utilisée pour ajouter un titre à sa playlist
router.get('/add-title', function(req, res, next) {
  req.session.myPlaylist.push({
    title: req.query.title,
    artist: req.query.artist,
    year: req.query.year
  });
  res.render('playlist', {myPlaylist: req.session.myPlaylist});
});

// route utilisée pour supprimer un titre de sa playlist
router.get('/delete-title', function(req, res, next) {
  req.session.myPlaylist.splice(req.query.position, 1);
  res.render('playlist', {myPlaylist: req.session.myPlaylist});
});

// route utilisée pour filtrer la musique par type (méthode filter)
router.get('/filter', function(req, res, next) {

  if (req.query.type === 'pop') {
    musicFilter = musicList.filter(music => music.type === 'pop');
  } else if (req.query.type === 'rock') {
    musicFilter = musicList.filter(music => music.type === 'rock');
  } else if (req.query.type === 'RnB') {
    musicFilter = musicList.filter(music => music.type === 'R&B');
  };
  res.render('index', {musicList: musicFilter, onSortClick})
});

// route utilisée pour le tri croissant/décroissant des titres par date (méthode sort )
router.get('/sort', function(req, res, next) {

  onSortClick = !onSortClick;
  var musicSortList;

  if (musicFilter === null){
    onSortClick
    ? musicSortList = musicList.sort((a, b) => a.year - b.year)
    :musicSortList = musicList.sort((a, b) => b.year - a.year)
  } else {
    onSortClick
    ? musicSortList = musicFilter.sort((a, b) => a.year - b.year)
    : musicSortList = musicFilter.sort((a, b) => b.year - a.year)
  };

  res.render('index', {musicList: musicSortList, onSortClick})
});

module.exports = router;
